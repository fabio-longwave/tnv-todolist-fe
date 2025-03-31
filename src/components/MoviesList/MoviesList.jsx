import {useState, useTransition} from "react";
import AlertButton from "./AlertButton.jsx";

const MoviesList = () => {
    const [query, setQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [isPending, startTransition] = useTransition();

    const items = Array.from({length: 10000}, (_, i) => `Elemento num: ${i + 1}` );

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        startTransition(() => {
            setFilteredItems(items.filter(item => item.includes(value)));
        })
    }



    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                <input value={query} onChange={handleChange} />
                <section>
                    {filteredItems.map((item, i) => (
                        <p key={i}> {item}</p>
                    ))}
                </section>

            </div>
        </>
    )
}

export default MoviesList;