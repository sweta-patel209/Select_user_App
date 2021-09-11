import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from '../contextApi/UserProvider'


const Dashboard = () => {
    const [tableData, setTableData] = useState(null);
    const { users, setUsers } = useContext(UserContext)
    const [text, setText] = useState('')
    const history = useHistory();
    var selectedUsers = []

    useEffect(() => {
        getAllUsersData();
    }, [])

    useEffect(() => {
        const fetchData = () => {
            if (text !== '') {
                const filteredData = tableData?.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
                setTableData(filteredData)
            }
            else {
                getAllUsersData();
            }
        }
        fetchData();
    }, [text])

    const getAllUsersData = async () => {
        let allUsers = [];
        try {
            let response = await axios.get(
                ` http://localhost:5000/users`
            );
            let listOfUsers = response.data
            let res = await axios.get(
                ` http://localhost:5000/avatar`
            );
            let listOfUsersPic = res.data
            for (let i = 0; i < listOfUsers?.length; i++) {
                allUsers.push({
                    name: listOfUsers[i]?.full_name,
                    profilePic: listOfUsersPic[i]?.avatar
                });
            }
            setTableData(allUsers);
        } catch (error) {
            console.log('error while fetching Users data', error);
        }
    }
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

    const selectRow = {
        hideSelectColumn: true,
        clickToSelect: true,
        bgColor: '#a2e4b3',
        onSelect: (row, isSelect, rowIndex, e) => {            
            insertInRow(row)
        },
        selected: getSelectedNames()        
    };

    function insertInRow(row) {       
        {
            users && users.map((user) => {                
                if (user.name === row.name) {
                    let finalArray = users.filter((ele) => (row.name !== ele.name || row.profilePic !== ele.profilePic))
                    setUsers(finalArray)                  
                }
                else{
                    selectedUsers.push(row)
                }
            })
        }
        selectedUsers.push(row)
    }

    function getSelectedNames() {
        let names = []
        if (users && users.length > 0) {
            users?.map(user => {
                names.push(user.name)
            })
        }
        return names
    }

    const goToSelectedUser = () => {
        history.push({
            pathname: '/Selected',
            state: { detail: selectedUsers }
        });
    }
    
    return (
        <div className='mainContainer' >
            <div>
                <h5 className='title'>SELECT USER</h5>
                <div className='searchContainer'>
                    <input className="form-control" type="text" placeholder="Search.." value={text}
                        onChange={(e) => setText(e.target.value)} />

                    <button className='searchButton'><SearchIcon className='searchIcon' /></button>
                </div>
                {tableData &&
                    <BootstrapTable
                        bordered={false}
                        keyField='name'
                        data={tableData}
                        columns={columns}
                        selectRow={selectRow}
                    />}
            </div>
            <div>
                <div className='btnContainer'>
                    <button className='btnCancel' >Cancel</button>
                    <button className='btnSelect' onClick={goToSelectedUser}>Select</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
