import React,{ useState} from 'react'
import axious from 'axios'
import { useApiDataContext } from '../providers/ApiDataProvider'
export const ApiFormDiv = (props) => {

    const BASE_URL = "http://localhost:4000/api/overview/"

    const [formData,setFormData] = useState({query: '', selectedQuery: 'all',uploadInput: ''})

    const {setData} = useApiDataContext();
    const {selectedQuery, query, uploadInput} = formData;

    const noQueryOptions = ['all']

    const requestData = () =>{
      //console.log("Requesting Data..."); 
      axious.get(BASE_URL + (noQueryOptions.includes(selectedQuery) ? selectedQuery: selectedQuery + "/" + query))
      .then( res =>{
        setData(res.data);
        setFormData({...formData, query: ''})
        console.log(res.data);
        //alert("Request was successful")
      })
      .catch( err =>{
        alert("Error: \n" + (err.response.data || err.message))
        console.log(err);
      })
      
    }

    const deleteData = () =>{
      //console.log("Requesting Data..."); 
      const url = BASE_URL + (noQueryOptions.includes(selectedQuery) ? selectedQuery: selectedQuery + "/" + query)
      console.log(url)
      axious.delete(url)
      .then( res =>{
        setData(res.data);
        setFormData({...formData, query: ''})
        console.log(res.data);
        //alert("Request was successful")
      })
      .catch( err =>{
        alert("Error: \n" + (err.response.data || err.message))
        console.log(err);
      })
      
    }
    const deleteAllResources = () =>{ 
      axious.delete(BASE_URL + "all")
      .then( res =>{
        setData(res.data);
        alert("Delete All Resources:\n" + res.data)
        console.log(res.data);
      })
      .catch( err =>{
        alert("Error: \n" + (err.response.data || err.message))
        console.log(err);
      })
      
    }
    const uploadTestResources  = () =>{
      axious.post(BASE_URL + "all")
      .then( res =>{
        setData(res.data);
        alert("upload test Resources")
        console.log(res.data);
      })
      .catch( err =>{
        alert("Error: \n" + (err.response.data || err.message))
        console.log(err);
      })
      
    }
    const uploadResources  = () =>{
      axious.post(BASE_URL + uploadInput)
      .then( res =>{
        setData(res.data);
        setFormData({...formData, uploadInput: ''})
        alert("upload test Resources")
        console.log(res.data);
      })
      .catch( err =>{
        alert("Error: \n" + (err.response.data || err.message))
        console.log(err);
      })
      
    }
    const selectedQueryOptions =[
      {value: 'all', innerText: 'All'},
      {value: 'exchange', innerText: 'By Exchange'},
      {value: 'symbol', innerText:'By Symbol'},
      {value: 'assettype', innerText:'By Asset Type'},
      {value: 'sector', innerText:'By Sector'},
      {value: 'cueerncy', innerText:'By Currency'},
      {value: 'country', innerText:'By Country'},
      {value: 'name', innerText:'By Name'},
      {value: 'marketcapgte', innerText: 'Market Cap Greater Than'},
      {value: 'marketcaplte', innerText: 'Market Cap Less Than'},
      {value: 'yearhighgte', innerText: 'Year High Greater Than'},
      {value: 'yearhighlte', innerText: 'Year High Less Than'},
      {value: 'ddbefore', innerText: 'Dividend Data Before (yyyy-mm-dd)'},
      {value: 'ddafter', innerText: 'Dividend Data after (yyyy-mm-dd)'},
    ]
    const renderOptions = (optionsArray)=>{
      return optionsArray.map(optionData =>{
        const {value, innerText} = optionData;
        return (<option value={value}>{innerText}</option>)
      })
    }
    
  return (
    <div style={{...props.style}}>
        <h2>API Form</h2>
        <select 
        value = {selectedQuery} 
        onChange ={
          e=>(setFormData({...formData, selectedQuery: e.target.value}))
          }>
          {renderOptions(selectedQueryOptions)}
        </select>
        <input
        style={{textAlign: 'center', display: noQueryOptions.includes(selectedQuery) ? 'none' : 'initial'}}
        type ='text' 
        id='text-input'
        placeholder='Search Data'
        value={query}
        onChange={e=>{setFormData({...formData, query: e.target.value})}}
        />
        <button
          style={{marginTop: 10}}
          onClick={requestData}
          >
            Request Query Data
          </button>
          <button
          style={{marginTop: 10}}
          onClick={deleteData}
          >
            Delete Query Data
          </button>
          <button
          style={{marginTop: 50}}
          onClick={deleteAllResources}
          >
            Delete All Data
          </button>
          <button
          style={{marginTop: 10}}
          onClick={uploadTestResources}
          >
            Upload Test Data
          </button>
          
          <input
            style={{textAlign: 'center',marginTop: 50}}
            type ='text' 
            id='text-input'
            placeholder='Upload Input'
            value={uploadInput}
            onChange={e=>{setFormData({...formData, uploadInput: e.target.value})}}
            />
          <button
          style={{marginTop: 10}}
          onClick={uploadResources}
          >
            Upload Resource By Input
          </button>

    </div>
  )
}
