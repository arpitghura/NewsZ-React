import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        // const handleSearch = ()=>{
        //     console.log("Search clicked"); 
        //     let searchurl = `https://newsapi.org/v2/top-headlines?&apiKey=809f6c8284c54a1ca949c9ceffc70358`;
        //     // console.log(target.value);
        // }
        return (
            <div className="container col-lg-5  my-3">
                <form className="d-flex">
                    <input className="form-control me-1" type="text" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success">Search</button>
                </form>
            </div>
        )
    }
}
