import React from 'react';
import keyBy from 'lodash/keyBy';
import { Link } from 'react-router-dom';

class Classic extends React.Component {
    state = {
        categories: {},
        subcategories: {},
    };

    async loadCategory() {
        const { match } = this.props;
        const { id } = match.params;

        const categoryResponse = await fetch(`http://localhost:3000/api/categories/${id}`);

        const category = (await categoryResponse.json()).category;

        this.setState({
            categories: {
                ...this.state.categories,
                [id]: category,
            }
        });
    }

    async loadSubcategories() {
        const { match } = this.props;
        const { id } = match.params;

        const subcategoryResponse =
            await fetch(`http://localhost:3000/api/categories?parent=${id}`);

        const subcategories = (await subcategoryResponse.json()).categories;

        this.setState({
            categories: {
                ...this.state.categories,
                ...keyBy(subcategories, 'id'),
            },
            subcategories: {
                ...this.state.subcategories,
                [id]: subcategories.map(x => x.id),
            }
        });
    }

    async componentWillMount() {
        this.loadCategory();
        this.loadSubcategories();
    }

    async componentDidUpdate(prevProps) {
        const { match } = this.props;

        if (prevProps.match.params.id !== match.params.id) {
            this.loadCategory();
            this.loadSubcategories();
        }
    }

    render() {
        const { match } = this.props;
        const { id } = match.params;

        const { categories, subcategories } = this.state;

        if (!categories[id] || !subcategories[id]) {
            return <div className="loading">Loading...</div>;
        }
        
        const category = categories[id];
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
}

export default Classic;
