import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";
import { UserContext } from '../contextApi/UserProvider'

const SelectedUsers = (props) => {
    const { users, setUsers } = useContext(UserContext)
    const location = useLocation();
    const history = useHistory();
    const [selectedUsers, setSelectedUsers] = useState(null)

    useEffect(() => {

        setSelectedUsers(location.state.detail)
        let newArray = []
        if (users !== undefined) {
            const narr = newArray.concat(users)
            let farray = narr.concat(location?.state.detail)
            let finalArray = farray.filter((ele, ind) => ind === farray.findIndex(elem => elem.name === ele.name && elem.profilePic === ele.profilePic))
            setUsers(finalArray)
            setSelectedUsers(finalArray)
        }
        else {
            setUsers(location.state.detail)
        }
    }, [location]);

    const columns = [{
        dataField: 'profilePic',
        text: 'Profile Pic',
        classes: 'profilePic',
        searchable: false,
        formatter: picFormatter,
        headerStyle: (column, colIndex) => {
            return { width: '5%' };
        }
    }, {
        dataField: 'name',
        text: 'User Name'
    },
    ];
    function picFormatter(cell, row) {
        return (
            <span>
                <img src={cell} style={{
                    width: 80,
                    height: 50,
                    borderRadius: '50%',
                    padding: '0 14px'
                }} />
            </span>
        );
    }

    const goToDashBoard = () => {
        history.push('/');
    }

    return (
        <div className='mainContainer'>
            <h5 className='title'>SELECTED USERS</h5>

            {selectedUsers?.length > 0 ?
                <BootstrapTable
                    bordered={false}
                    keyField='name'
                    data={selectedUsers}
                    columns={columns}
                /> : 'NO USER HAS BEEN SELECTED'}
            <div className='btnContainer'>
                <button className='btnBack' onClick={goToDashBoard} >Back</button>

            </div>
        </div>
    )
}

export default SelectedUsers
