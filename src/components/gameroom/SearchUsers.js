import React from 'react';

const SearchUsers = ({ searchUsers }) => {
    const onInputSearch = (event) => {
        searchUsers(event.target.value.trim().toLowerCase());
    };

    return (
        <div className="search-users">
            <input onInput={onInputSearch} />
        </div>
    );
};

export default SearchUsers;