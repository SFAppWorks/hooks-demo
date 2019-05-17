import React, { useState, useEffect } from 'react';
import keyBy from 'lodash/keyBy';
import { Link } from 'react-router-dom';

function Hooks({ match }) {
    const [categories, setCategories] = useState({});
    const [subcategories, setSubcategories] = useState({});
    const { id } = match.params;

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

    const category = categories[id];

    if (!category || !subcategories[id]) {
        return 'Loading...';
    }

    const subcategoriesList = subcategories[id].map(x => categories[x]);

    return (
        <div>
            <section>
                <h1>{ category.name }</h1>

                <ul>
                    { subcategoriesList.map(x => 
                        <li key={ x.id }>
                            <Link to={ `/classic/${x.id}` }>{ x.name }</Link>
                        </li>    
                    )}
                </ul>

                { category.parent !== 'shop' &&
                    <Link to={ `/classic/${category.parent}` } className="button">
                        Up
                    </Link>
                }
            </section>
        </div>
    )
}

export default Hooks;
