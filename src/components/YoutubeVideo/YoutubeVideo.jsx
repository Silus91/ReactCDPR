import React from "react";
import YouTube from "react-youtube";
import "./YoutubeVideo.css";

class YoutubeVideo extends React.Component {
  videoOnReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const { videoId } = this.props;
    return (
      <div className='video-container'>
        <YouTube
          videoId={videoId}
          onReady={this.videoOnReady}
          className='video'
        />
      </div>
    );
  }
}

export default YoutubeVideo;
