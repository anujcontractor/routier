import Dropdown from './Dropdown';
import { Textinput1, Textinput2, Textinput3 } from './textinput';
import {Rating} from "react-simple-star-rating";
import IMG from "./Assets/reviewplaceholder.jpg";
import IMG2 from "./Assets/addphotoicon.png";
import "./Review.module.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const colors = {
  Starcolor: "#f29d38",
  grey: "#a9a9a9"
};




function Review() {

  return (
    <div>
     

  
      
      

      <div className=' maintitle'>
        Tell us, how’s your visit?
      </div>

      
        
        <div style={styles.texts} className='title2'>How would you rate this place?</div>


        <div >

          
                <Rating
                className='rating'
                SVGstyle={ { 'display':'inline' } }/>
            
     
              <p className='rating_text'>
                Excellent  
              </p>    


              
              
        </div>

        <div>
          <img src={IMG} alt='' className='image1 '/>
        </div>

        
      

        <div style={styles.texts} className='titel3'>When did you go?</div>
          
        <div className='main_dropdown '>
              <Dropdown/>
        </div>

        <div style={styles.texts} className='title4'>Whom did you go with?</div>
              
          <div className='main_text1  '>
              <Textinput1 />
          </div>

        <div className='location_display '>
          <h1 >
                Opa Restaurant
          </h1>

          <h2 >
              Location
          </h2>

        </div>

        <div style={styles.texts} className='title5 '>Title a Review</div>

        <div className='main_text2 ]' >
            <Textinput2 />
        </div>

        <div style={styles.texts} className='title6 '>Write a review</div>

        <div className='main_text3 '>
              <Textinput3 />    
        </div>  

        <div style={styles.texts} className='title7  '>Add some photos</div>
        
          
        <label className='photoupload ' >
          <div className='photuploadstyle'  >

              <img src={IMG2} alt=''  />

              <p > Click to add photos </p>

              <input id="image" type="file" name="image"  style={{display: 'none'}} width={874} height={192}
              
              />
          </div>
        </label>
            
          

        <div className='button_container '>
    
          <button className='submitbutton' >
    
              Submit Your Review
    
          </button>
    
        </div>
        

    </div>
    
        

  );
}


const styles ={

  texts: {
    display: "flex",
    flexDirection: "column",
    color: "#74B6C2",
    fontSize: "2rem",
    lineHeight: "2.28rem",
    paddingRight: "7.75rem",
    paddingLeft: "8rem",
    fontFamliy: "Poppins",
    fontWeight: "600",
  },



  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  
  },

  stars: {
    display: "flex",
    flexDirection: "row",

  }


}

export default Review;
