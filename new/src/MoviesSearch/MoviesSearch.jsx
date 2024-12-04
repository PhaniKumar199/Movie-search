import { useEffect, useState, useMemo } from "react";
import './index.css';

const MoviesSearch = () => {
    const [data, setData] = useState([]); 
    const [error, setError] = useState(''); 
    const [search, setSearch] = useState(''); 
    
    
    useEffect(() => {
        fetch("./movies.json")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => setError("Failed to load data"));
    }, []);

    
     const filteredProducts = useMemo(() => {
        return data.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||          
            item.year.toString().includes(search)
        );
    }, [data, search]);

    if (error) {
        return <p>{error}</p>;
    }

    
     
     
    return (
        <div className="cards">
            <div className="in">
                <input
                    type="text"
                    placeholder="What product would you like to buy?"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            <h1>Your search history: <span>{search}</span></h1>
            <h3>Browse by category</h3>

            <div className="product-card">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <div key={index}>
                            <div className="card">
                                <img src={item.movie} alt={item.title} width={"400px"}/>
                                <h1>{item.title}</h1>
                                 <h1>{item.year}</h1>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Movies found</p> 
                )}
            </div>
        </div>
    );
};

export default MoviesSearch;
