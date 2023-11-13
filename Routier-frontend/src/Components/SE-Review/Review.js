import Dropdown from './components/Dropdown';
import { Textinput1, Textinput2, Textinput3 } from './components/textinput';
import {Rating} from "react-simple-star-rating"
import IMG from "./assets/addphoto.png"
import IMG2 from "./assets/photo1.jpg"

const colors = {
  Starcolor: "#f29d38",
  grey: "#a9a9a9"
};




function Review() {

  return (
    <div>
     

  
      
      

      <div className='body1 flex text-[#046b82] font-poppins font-[700] justify-center items-center text-[3rem] leading-[3.42rem] pt-[10.19rem] pb-[4.69rem]'>
        Tell us, how’s your visit?
      </div>

      
        
        <div style={styles.texts} className='pb-4'>How would you rate this place?</div>


        <div >

          
                <Rating
                className='ml-[7.75rem] pr-[1.5rem] mt-[1rem]]'
                SVGstyle={ { 'display':'inline' } }/>
            
     
              <p className='inline-block align-middle font-poppins text-2xl font-normal leading-[0.875rem] text-[#8C9091] '>
                Excellent  
              </p>    


              
              
        </div>

        <div>
          <img src={IMG2} alt='' className='absolute translate-x-[58.19rem] mb-0 pb-[1.63rem]'/>
        </div>

        
      

        <div style={styles.texts} className=' pt-[3.56rem] pb-[1.69rem]'>When did you go?</div>
          
        <div className='pl-[8.56rem] pb-[3.56rem]'>
              <Dropdown/>
        </div>

        <div style={styles.texts} className='pb-[0.75rem]'>Whom did you go with?</div>
              
          <div className='px-[8.56rem]  '>
              <Textinput1 />
          </div>

        <div className=' ml-[58.5rem] pb-[0.37rem]'>
          <p className=' text-black font-poppins font-normal text-[1.125rem] leading-[1.375rem] pb-[0.44rem]'>
                Opa Restaurant
          </p>

          <p className='text-[#A5A5A5] font-poppins font-normal text-[1.125rem] leading-[1.375rem]'>
              Location
          </p>

        </div>

        <div style={styles.texts} className='pb-[0.62rem]'>Title a Review</div>

        <div className='px-[8.56rem] pb-[4.56rem]' >
            <Textinput2 />
        </div>

        <div style={styles.texts} className='pb-[1.06rem]'>Write a review</div>

        <div className='px-[8.56rem] pb-[5.06rem]  '>
              <Textinput3 />    
        </div>  

        <div style={styles.texts} className='pb-[1.06rem] pl-[8rem] '>Add some photos</div>
        
          
        <label className='block w-[54.0625rem] h-[12rem] ml-[8.56rem] mb-[5.06rem] cursor-pointer' >
          <div className='block bg-[#ECECEC] w-[54.0625rem] h-[12rem] rounded-[0.625rem]'  >

              <img src={IMG} alt=''  className='absolute translate-y-[3.06rem] translate-x-[26.06rem] w-8 h-8'/>

              <p className='absolute translate-y-[5.06rem] translate-x-[20.94rem] text-black font-poppins font-medium text-xl leading-none '> Click to add photos </p>

              <input id="image" type="file" name="image"  style={{display: 'none'}} width={874} height={192}
              
              />
          </div>
        </label>
            
          

        <div className='flex items-center justify-center pb-[4.5rem] '>
    
          <button className='flex w-[38.375rem] h-12 font-poppins bg-[#046B82] text-white justify-center items-center rounded-[2.5rem]' >
    
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
