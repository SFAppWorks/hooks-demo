import React, { useState, useEffect } from 'react';
import keyBy from 'lodash/keyBy';
import { Link } from 'react-router-dom';

const useCategoryData = id => {
    const [categories, setCategories] = useState({});
    const [subcategories, setSubcategories] = useState({});

    const loadCategory = async () => {
        const categoryResponse = await fetch(`http://localhost:3000/api/categories/${id}`);

        const category = (await categoryResponse.json()).category;

        setCategories(state => ({
            ...state,
            [id]: category,
        }));
    };

    const loadSubcategories = async () => {
        const subcategoryResponse =
            await fetch(`http://localhost:3000/api/categories?parent=${id}`);

        const subcategories = (await subcategoryResponse.json()).categories;

        setCategories(state => ({
            ...state,
            ...keyBy(subcategories, 'id'),
        }));

        setSubcategories({
            ...subcategories,
            [id]: subcategories.map(x => x.id),
        });
    };

    useEffect(() => {
        loadCategory();
        loadSubcategories();
    }, [id]);

    return [categories[id], subcategories[id] && subcategories[id].map(x => categories[x])];
};

function Hooks({ match }) {
    const { id } = match.params;
    const [category, subcategories] = useCategoryData(id);

    if (!category || !subcategories) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <section>
                <h1>{ category.name }</h1>

                <ul>
                    { subcategories.map(x => 
                        <li key={ x.id }>
                            <Link to={ `/hooks/${x.id}` }>{ x.name }</Link>
                        </li>    
                    )}
                </ul>

                { category.parent !== 'shop' &&
                    <Link to={ `/hooks/${category.parent}` } className="button">
                        Up
                    </Link>
                }
            </section>
        </div>
    )
}

export default Hooks;
