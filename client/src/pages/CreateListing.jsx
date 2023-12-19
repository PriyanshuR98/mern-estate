import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase.js';


export default function CreateListing() {
    const[files,setFiles]=useState([]);
    const[formData,setFormData]=useState({
        imageUrls:[],
        
        
    })

    const[imageUploadError,setImageUploadError]=useState(false);

    const [uploading,setUploading]=useState(false);
    
    
    console.log(formData);    
                //   at 5:49
    const handleImageSubmit =(e)=>{
        if(files.length>0 && files.length+formData.imageUrls.length <7){
            setUploading(true);
            setImageUploadError(false);
            const promises=[];
            
            
            for(let i=0;i<files.length;i++)
            {
                promises.push(storeImage(files[i]));
                
                
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls),
                });
                
                setImageUploadError(false);
                setUploading(false);
               
                
            }).catch((err)=>{
                setImageUploadError('Image Upload Failed (2 mb max per image)');
                setUploading(false);
            });
           
            
        } else{
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false);
        }  
        
    } ;

    
    
    
    const storeImage= async(file)=>{
        return new Promise((resolve,reject)=>{
          const storage=getStorage(app);
          const fileName= new Date().getTime()+file.name;
          const storageRef=ref(storage,fileName);
          const uploadTask= uploadBytesResumable(storageRef,file);
          
          uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progess=
                (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`Upload is ${progess}% done`);
            },
            (error)=>{
                reject(error);
            },
            
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL);
                })
            }
            
          );
           
        });
    }

    const handleRemoveImage=(index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i) => i!== index),
        })
    }


  return (
    <main className='max-w-4xl p-3 mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 '> Create a Listing </h1>
        <form className='flex flex-col gap-4 sm:flex-row' >
            <div className='flex flex-col flex-1 gap-4'>
                
                <input type="text" placeholder='Name' className='p-3 border rounded-lg' id='name' maxLength='62'  minLength='10' required/>
                <input type="text" placeholder='Description' className='p-3 border rounded-lg' id='description'  required/>
                <input type="text" placeholder='Address' className='p-3 border rounded-lg' id='address' required/>    
                
                <div className='flex flex-wrap gap-6'>
                    
                    <div className='flex gap-2 '>
                       <input type="checkbox" id='sale' className='w-5' />
                       <span>Sell</span>
                    </div>
                    
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>
                    
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking Spot </span>
                    </div>
                    
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='other' className='w-5' />
                        <span>Others</span>
                    </div>
                    
                </div> 

                
                <div className='flex flex-wrap gap-6 '>
                    
                    <div className='flex items-center gap-2 '>
                        <input type="number" id='bedrooms' min='1' max='10' required  className='p-3 border-gray-300 rounded-lg'/>
                        <p>Beds</p>
                    </div>
                    
                    <div className='flex items-center gap-2 '>
                        <input type="number" id='bathrooms' min='1' max='10' required  className='p-3 border-gray-300 rounded-lg'/>
                        <p>Baths</p>
                    </div>
                        
                    <div  className='flex items-center gap-2'>
                        <input type="number" id='regularPrice' min='1' max='10' required  className='p-3 border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                           <p>Regular price</p>
                           <span className='text-xs'>($ / month)</span>
                        </div>
                      
                    </div>
                    
                    <div className='flex items-center gap-2 '>
                            <input type="number" id='discountPrice' min='1' max='10' required  className='p-3 border-gray-300 rounded-lg'/>
                            <div className='flex flex-col items-center'>
                              <p>Discounted price</p>
                              <span className='text-xs'>$ / month)</span>
                            </div>
                    </div>
                
                </div>

                
            
            </div>
            
            <div className='flex flex-col flex-1 gap-4 '>
                <p className='font-semibold '>Images:
                <span className='ml-2 font-normal text-gray-600 '>The first image will be the cover(max 6)</span>
                </p>
                <div className='flex gap-4 '>
                    <input onChange={(e)=>setFiles(e.target.files)} className="w-full p-3 border border-gray-300 rounded" type="file" id='images' accept='image/*' multiple/>
                    <button  disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80 '>{uploading ?'Uploading': 'Upload' }</button>
                </div>
                <p className='text-sm text-red-700 '>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length> 0 && formData.imageUrls.map((url,index)=>(
                       <div key={url} className="flex items-center justify-between p-3 border">
                         <img src={url} alt="listing image"  className='object-contain w-20 h-20 rounded-lg'/>
                         <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 uppercase rounded-lg hover:opacity-75 '>
                            Delete
                        </button>
                       </div>
                    ))
                }
                
                <button className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80 '>Create Listing</button>
            </div>

            
            
        </form>
    </main>
  )

  }