import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

const NavBar = (props) => {
    const [search, setSearch] = useState()

    const handleSearch = (e) => {
        setSearch(e.target.value)
        props.handleSearch(e.target.value)
    }
    return (
        <Nav>
            {props.handleSearch ?
                <Nav.Item className="search-item">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                        <input type="search" className="form-control"
                            placeholder="Search"
                            value={search} onChange={handleSearch}

                        />
                    </InputGroup>
                </Nav.Item> :
                <Nav.Item>
                    <h3>MovieDetails</h3>
                </Nav.Item>}
            <Nav.Item className="justify-content-end">
                <Nav.Link href="/" className="home-link"><HomeIcon color="black" /></Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default NavBar;
<p>

</p>