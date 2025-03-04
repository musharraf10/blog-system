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
            steps
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

module.exports =  addStepbyStepGuide ;
