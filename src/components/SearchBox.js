import React,{useState,useEffect} from 'react'
import { Button,Form ,FormControl,InputGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';


const SearchBox = ({keyHandler}) => {
    const navigate=useNavigate()
    const [keyword,setKeyword]=useState('');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }
        //ELSE

    }

    let key=window.location.hash != "#/" ? window.location.hash.split('#')[1] : '';;


    useEffect(()=>{
        keyHandler({key,keyword})
    },[key,keyword])


    return (
        <Form onSubmit={submitHandler} className='d-flex'>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search"
          />
          <Button type='submit' variant='light' className='p-2'>
            <Search  />
          </Button>
        </InputGroup>
      </Form>
    )
}

export default SearchBox
