import React from "react"

import github from "../../github-icon.png"
import linkedin from "../../linkedin-icon.png"
import "./Footer.css"

function Footer() {

    return (
        <div className="footer__container">
            <div className="subfooter__container" />
            <div className="icons__container">
                <div className="text-description">
                    FunFinder is an app by Franco Portin
                </div>
                <div className="github__container">
                    <a href="https://github.com/fportin">
                        <img className="github-icon" src={github} alt="Github Logo"/>
                    </a>
                </div>
                <div className="linkedin__container">
                    <a href="https://www.linkedin.com/in/franco-portin">
                        <img className="linkedin-icon" src={linkedin} alt="LinkedIn Logo"/>
                    </a>
                </div>
            </div>
        </div>

    )
}


export default Footer;