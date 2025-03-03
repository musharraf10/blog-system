import React, { useEffect, useState } from "react";
import { fetchTrendingContent } from "../../../APIServices/subscribe/trendingapi";
import { Spinner, Alert, Container, Row, Col, Card, Button } from "react-bootstrap";

const Trending = () => {
  const [trendingData, setTrendingData] = useState({
    articles: [],
    videos: [],
    webinars: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingContent();
        console.log(data)
        setTrendingData({data});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🔥 Trending Content</h2>

      {/* Articles */}
      <div className="mb-5">
        <h3 className="text-primary">📖 Top Articles</h3>
        <Row>
          {trendingData.articles.map((article, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={article.thumbnail} alt={article.title} />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Button variant="primary" href={article.contentUrl} target="_blank">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Videos */}
      <div className="mb-5">
        <h3 className="text-success">🎬 Top Videos</h3>
        <Row>
          {trendingData.videos.map((video, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={video.thumbnail} alt={video.title} />
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Button variant="success" href={video.contentUrl} target="_blank">
                    Watch Video
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Webinars */}
      <div>
        <h3 className="text-warning">📅 Top Webinars</h3>
        <Row>
          {trendingData.webinars.map((webinar, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={webinar.thumbnail} alt={webinar.title} />
                <Card.Body>
                  <Card.Title>{webinar.title}</Card.Title>
                  <Button variant="warning" href={webinar.contentUrl} target="_blank">
                    Join Webinar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Trending;
