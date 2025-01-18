import React, { useEffect, useRef, useState } from 'react';
import celebrities from "../data/celebrities.json"
import CardComponent from './CardComponent';

const BodyComponent = () => {

    const searchRef = useRef();
    const [ userData, setUserData ] = useState([]);
    const [ filteredUserData, setFilteredUserData ] = useState([]);
    const [ showIndex, setShowIndex ] = useState(0);
    const [ editIndex, setEditIndex ] = useState(null);

    useEffect(() => {
        setUserData(celebrities);
        setFilteredUserData(celebrities);
    }, []);

    const handleCardClick = (index) => {
        if(editIndex === null){
            if (index === showIndex) {
                setShowIndex(null);
            } else {
                setShowIndex(index);
            }
        }
    };

    const filterUserData = () => {
        const searchValue = searchRef.current.value.toLocaleLowerCase();
        const filteredData = userData.filter((user) => user.first.toLocaleLowerCase().includes(searchValue) || user.last.toLocaleLowerCase().includes(searchValue))
        setFilteredUserData(filteredData)
    }

    const resetUserData= () => {
        setFilteredUserData(userData);
        searchRef.current.value = "";
    }

    const deleteUser = (id) => {
        const updatedData = userData.filter(user => user.id !== id);
        setUserData(updatedData); 

        const updatedFilteredData = filteredUserData.filter(item => item.id !== id);
        setFilteredUserData(updatedFilteredData);
    }

    const updateUser = (id, updatedData) => {
        const updatedUserData = userData.map((user) =>
            user.id === id ? { ...user, ...updatedData } : user
        );
        setUserData(updatedUserData);
        setFilteredUserData(updatedUserData);
    };

    return (
        <div className='body-container'>
            <div className='body-input-container'>
                <input
                    ref={searchRef}
                    placeholder='search user'
                ></input>
                <div className='body-input-button-container'>
                    <button className='input-search-btn' onClick={() => filterUserData()}>Search</button>
                    <button className='clear-search-btn' onClick={() => resetUserData()}>Clear</button>
                </div>
                <div className='card-container'>
                    {
                        filteredUserData.map((iUser, index) => {
                            return (
                                <CardComponent 
                                    key={iUser.id} 
                                    user={iUser}
                                    showItem={index === showIndex && true}
                                    setShowIndex={() => handleCardClick(index)}
                                    editItem={index === editIndex && true}
                                    setEditIndex={() => setEditIndex(index)}
                                    resetEditIndex={() => setEditIndex(null)}
                                    deleteUser={() => deleteUser(iUser.id)}
                                    updateUser={updateUser}
                                ></CardComponent>
                            )
                        })
                    }         
                </div>
            </div>  
        </div>
    );
}

export default BodyComponent;