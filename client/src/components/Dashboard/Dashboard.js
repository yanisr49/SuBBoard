import React, {Component} from "react";
import { Button } from "react-bootstrap";

import SubAPI from "../../utils/SubAPI";
import API from "../../utils/API";
import Thumbnail from "./Thumbnail"
import SideMenu from '../SideMenu/SideMenu';

import './Dashboard.css'

export class Dashboard extends Component {


    constructor() {
        super();
        this.state = {
            data : []
        }
    }

    getData = async () => {
        try {
            const { data } = await SubAPI.getSubs(
                localStorage.getItem("email")
            );
            this.setState({data: data.data});
        } catch (error) {
            console.error(error);
        }
    };

    async componentDidMount() {
        Array.from(document.getElementsByClassName("wrapper")).forEach(element => {
            if(element.clientHeight > 25) {
                element.style.width = "250px";
                element.childNodes.item(0).style.right = "0";
            }
        });
        await this.getData();
    }

    saveName = (id, name) => {
        localStorage.setItem("name", name);
        localStorage.setItem("idSub", id);
        window.location = "/subscription/" + name;
    }

    redirectNew = () => {
        window.location = "/subscription/new";
    }

    engToFrFrequence = (frequency) => {
        if(frequency == "daily")
            return "Quotidient";
        if(frequency == "weekly")
            return "Hebdomadaire";
        if(frequency == "monthly")
            return "Mensuelle";
        if(frequency == "yearly")
            return "Annuelle";
    }

    formattedDate = (date) => {
        const d = new Date(date);
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${day}/${month}/${year}`;
    }

    render() {
        return (
            <div id="dashBoard">
                <SideMenu id="0" />
                <div className="section">
                    <div className="title">
                        <h1>Mes abonnements</h1>
                    </div>
                    {
                        this.state.data.map(({id, name, logo_path, period}, index) => (
                            <Thumbnail
                                id={id}
                                name={name}
                                period={period}
                                key={index}
                                onClick={this.saveName}
                                frequencyFunction={this.engToFrFrequence}
                                dateFunction={this.formattedDate}
                                key={id}
                            />
                        ))
                    }
                    <div className="thumbnail new" onClick={this.redirectNew}>+</div>
                </div>
            </div>
        );
    }
}