import React from "react"

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <div className="animated-item circle" style={{ top: "10%", left: "10%" }}></div>
      <div className="animated-item star" style={{ top: "20%", right: "20%" }}></div>
      <div className="animated-item square" style={{ bottom: "15%", left: "25%" }}></div>
      <div className="animated-item triangle" style={{ bottom: "25%", right: "15%" }}></div>
      <div className="animated-item circle" style={{ top: "40%", left: "60%" }}></div>
      <div className="animated-item star" style={{ bottom: "40%", right: "60%" }}></div>
    </div>
  )
}

export default AnimatedBackground

