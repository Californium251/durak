"use client";
import React from "react";
import MainContainer from "./Container";
import CreateGameButton from "./CreateGameButton";
import "./main-page-styles.css";

const MainPage = () => {

    return (
        <div className="page-container">
            <MainContainer>
                <div className="header-wrapper">
                    <h1 className="header">Durak</h1>
                    <p className="subheader">
                        – I spent half of it on women, booze and horses. I blew the rest.
                    </p>
                </div>
                <div className="button-wrapper">
                    <CreateGameButton/>
                </div>
            </MainContainer>
        </div>
    );
};

export default MainPage;
