import * as React from "react";

import "../styles/Header.css"

let cityUser = "Москва";

function Header() {

    

    return (
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <p>Прогноз погоды</p>
                </div>
                <div className="header-city">
                    <ul>
                        <li>{cityUser}</li>
                        {/* <li>Погода на 5 дней</li> */}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;

