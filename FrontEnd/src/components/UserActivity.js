import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import PieChart from "react-svg-piechart";
import * as API from '../api/API';

class UserActivity extends Component {

  constructor() {
         super()

         this.state = {
             expandedSector: null,
             details:[],
             color:"#3b5998"
         }

         this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
     }

     handleMouseEnterOnSector(sector) {
         this.setState({expandedSector: sector})
     }

     componentWillMount(){
       API.getUserActivity()
           .then((data) => {
               console.log("data: "+ Object.keys(data));
                console.log("data len user: " + data);
               if(data){
                 var userDetails =[
                   {label: "Shared Files", value:data.sharedFiles , color: "#3b5998"},
                   {label: "Uploaded Files", value: data.uploadedFiles, color: "#00aced"},
                   {label: "Deleted Files", value: data.deletedFiles, color: "#cb2027"},
                 ]
                  console.log(userDetails);
                 this.setState({
                   details : userDetails || [],
                 });
               }
           })
     }
     render() {
         const {expandedSector} = this.state

         return (
             <div className="col-md-5 mr-5 justify-content-md-center">
             <PieChart
                    data={ this.state.details }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    sectorStrokeWidth={2}
                    expandOnHover
                    shrinkOnTouchEnd
                />
                 <div>
                 {
                     this.state.details.map((element, i) => (
                         <div key={i}>
                             <span style={{background: this.state.color}}></span>
                             <span style={{fontWeight: this.state.expandedSector === i ? "bold" : null}}>
                                 {element.label} : {element.value}
                             </span>
                         </div>
                     ))
                 }
                 </div>
             </div>
         )
     }
   }

export default withRouter(UserActivity);
