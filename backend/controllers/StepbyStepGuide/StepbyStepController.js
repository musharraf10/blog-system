// const StepbyStepGuide = require('../../models/StepbyStepGuide/StepbyStepGuide');
// const cloudinary = require('../../utils/Cloudinary');


// const addStepbyStepGuide = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Uploaded Files:", req.files);

//         const { title, description } = req.body;
        
//         let steps = [];
//         if (req.body.steps) {
//             try {
//                 steps = JSON.parse(req.body.steps);
//                 console.log("Parsed Steps:", steps);
//             } catch (error) {
//                 console.error("Invalid JSON in steps field:", error);
//                 return res.status(400).json({ message: "Invalid JSON format in steps field" });
//             }
//         }

//         const thumbnailImage = req.files['thumbnailImage'] ? req.files['thumbnailImage'][0].path : null;
//         const stepMediaFiles = req.files['stepMedia'] ? req.files['stepMedia'].map(file => file.path) : [];

//         console.log("Thumbnail Image:", thumbnailImage);
//         console.log("Step Media Files:", stepMediaFiles);

//         // **Attach Media Files to Steps**
//         steps.forEach((step, index) => {
//             step.stepMedia = stepMediaFiles[index] || null;
//         });

//         console.log("Final Steps Data:", steps);

        
//         const newGuide = new StepbyStepGuide({
//             title,
//             description,
//             thumbnailImage,
//             steps
//         });

//         await newGuide.save();

//         res.status(201).json({ message: 'Guide added successfully', guide: newGuide });
//     } catch (error) {
//         console.error("Server Error:", error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };

// module.exports = { addStepbyStepGuide };


const StepbyStepGuide = require('../../models/StepbyStepGuide/StepbyStepGuide');
const cloudinary = require('../../utils/Cloudinary');
const Tag = require("../../models/Tags/Tags.js");
const Post = require("../../models/Post/Post.js");
const { response } = require('express');


const addStepbyStepGuide = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { title, description, tags, status } = req.body;


        if( !title || !description || !status){
            return res.status(400).json({ message: "All fields are required" });
        }

        let steps = [];
        if (req.body.steps) {
            try {
                steps = JSON.parse(req.body.steps);
                console.log("Parsed Steps:", steps);
            } catch (error) {
                console.error("Invalid JSON in steps field:", error);
                return res.status(400).json({ message: "Invalid JSON format in steps field" });
            }
        }

        let thumbnailImageUrl = null;
        if (req.files['thumbnailImage']) {
            const uploadResult = await cloudinary.uploader.upload(req.files['thumbnailImage'][0].path, {
                folder: 'step_guides',
                resource_type: 'image'
            });
            thumbnailImageUrl = uploadResult.secure_url;
        }

        let stepMediaUrls = [];
        if (req.files['stepMedia']) {
            for (let file of req.files['stepMedia']) {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'step_guides',
                    resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
                });
                stepMediaUrls.push(uploadResult.secure_url);
            }
        }

        steps.forEach((step, index) => {
            step.stepMedia = stepMediaUrls[index] || null;
        });

        console.log("Final Steps Data:", steps);
        
        const newGuide = new StepbyStepGuide({
            title,
            description,
            thumbnailImage: thumbnailImageUrl, 
            steps,
            tags
        });

        const createPost=new Post({
            author: req.user,
            status,
            contentData: "StepbyStepGuide",  
            refId: newGuide._id
          })
      
          await newGuide.save();
        
        const tagArray = Array.isArray(tags) ? tags : JSON.parse(tags);
        for (const tagName of tagArray) {
            const tag = await Tag.findOneAndUpdate(
              { tagname: tagName },
              {
                $setOnInsert: { tagname: tagName, createdBy: req.user },
                $push: { allposts: newGuide._id },
              },
              { new: true, upsert: true }
            );
            
        }
        await createPost.save()
        

        res.status(201).json({ message: 'Guide added successfully', guide: newGuide , Tag : tagArray});
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateStepbyStepGuide = async (req, res) => {
    try {
        const { id } = req.params; // Guide ID
        const { title, description, tags, status, steps, price } = req.body;
        const thumbnail = req.files?.['thumbnailImage'] ? req.files['thumbnailImage'][0].path : null;

        console.log("Received update request for Guide ID:", id);

        // Find the post that references this guide
        const post = await Post.findById(id).populate("refId");

        if (!post) {
            return res.status(404).json({ status: "error", message: "Guide post not found." });
        }

        if (!post.refId) {
            return res.status(400).json({ status: "error", message: "Guide reference (refId) not found." });
        }

        // Update the guide details inside refId
        post.refId.set({
            title: title || post.refId.title,
            description: description || post.refId.description,
            price: price !== undefined ? price : post.refId.price,
            thumbnailImage: thumbnail || post.refId.thumbnailImage,
        });

        let parsedSteps = post.refId.steps;
        if (steps) {
            try {
                parsedSteps = JSON.parse(steps);
            } catch (error) {
                return res.status(400).json({ message: "Invalid JSON format in steps field" });
            }
        }

        // Handle step media uploads
        let stepMediaUrls = [];
        if (req.files?.['stepMedia']) {
            for (let file of req.files['stepMedia']) {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'step_guides',
                    resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
                });
                stepMediaUrls.push(uploadResult.secure_url);
            }
        }

        // Assign media URLs to steps
        parsedSteps.forEach((step, index) => {
            step.stepMedia = stepMediaUrls[index] || step.stepMedia;
        });

        post.refId.steps = parsedSteps;

        // Update the corresponding post
        post.set({
            status: status || post.status,
            price: post.refId.price,
            thumbnail: thumbnail || post.thumbnail,
        });

        // Save both the guide and the post
        await post.refId.save();
        await post.save();

        // Handle tags update
        const tagArray = Array.isArray(tags) ? tags : JSON.parse(tags);
        for (const tagName of tagArray) {
            await Tag.findOneAndUpdate(
                { tagname: tagName },
                {
                    $setOnInsert: { tagname: tagName, createdBy: req.user },
                    $push: { allposts: post.refId._id },
                },
                { new: true, upsert: true }
            );
        }

        return res.status(200).json({
            status: "success",
            message: "Guide updated successfully!",
            guide: post.refId,
            post,
            tags: tagArray,
        });
    } catch (error) {
        console.error("Error updating guide:", error);
        return res.status(500).json({ status: "error", message: "Failed to update guide. Please try again." });
    }
};


const getVideoGuide = async (req,res) =>{
    try {
        const video = await Post.find({contentData : "StepbyStepGuide"}).populate('refId');

        res.status(200).json({response : video})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

const VideoGuideSingle = async(req, res) =>{
    try {
        const {guideId} = req.params;
        console.log(guideId)

        const findGuide = await Post.findById(guideId).populate("refId");

        res.status(200).json({response : findGuide});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports =  {addStepbyStepGuide, getVideoGuide,VideoGuideSingle , updateStepbyStepGuide} ;
