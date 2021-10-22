import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import trybefoodback from '../images/trybefoodback.png';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Favorite.css';

export default function FavoriteRecipes() {
  const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(allRecipes || []);
  const [linkShare, setLinkShare] = useState(false);

  const setFilterData = async ({ target: { value } }) => {
    if (value === 'comida' || value === 'bebida') {
      const recipesFiltered = allRecipes.filter((recipe) => recipe.type === value);
      setFavoriteRecipes(recipesFiltered);
      return true;
    }
    setFavoriteRecipes(allRecipes);
  };

  const removeFavorites = async (id) => {
    let favoritesRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoritesRecipes = favoritesRecipes.filter((recipe) => recipe.id !== id);
    await localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
    setFavoriteRecipes(favoritesRecipes);
  };

  const cardMeals = (recipe, index) => {
    const { id, type, name, image, area, category } = recipe;
    return (
      <div key={ index }>
        <div className="section-card">
          <div className="dish-images">
            <Link to={ `/${type}s/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                className="card-img"
                src={ image }
                alt={ name }
              />
              <img className="dish-bg" src={ trybefoodback } alt="dish background" />
            </Link>
          </div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
            className="card-title"
          >
            { name }
          </Link>
          <div>
            <button
              className="favorite-btn"
              onClick={ () => {
                copy(`http://localhost:3000/${type}s/${id}`);
                setLinkShare(true);
              } }
              type="button"
            >
              <img
                className="share-image"
                src={ shareIcon }
                alt="imagem de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { linkShare && <p className="link-copiado">Link copiado!</p> }
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="favorite-btn"
              type="button"
            >
              <img
                data-testid="favorite-btn"
                alt="icone favorito"
                src={ blackHeartIcon }
                className="heart-img"
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const cardDrinks = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot } = recipe;
    return (
      <div key={ index }>
        <div className="section-card">
          <div className="dish-images">
            <Link to={ `/${type}s/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                className="card-img"
                src={ image }
                alt={ name }
              />
              <img className="dish-bg" src={ trybefoodback } alt="dish background" />
            </Link>
          </div>
          <Link
            to={ `/${type}s/${id}` }
            data-testid={ `${index}-horizontal-name` }
            className="card-title"
          >
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { alcoholicOrNot }
            </span>
            { ` - ${name}` }
          </Link>
          <div>
            <button
              className="favorite-btn"
              onClick={ () => {
                copy(`http://localhost:3000/${type}s/${id}`);
                setLinkShare(true);
              } }
              type="button"
            >
              <img
                className="share-image"
                src={ shareIcon }
                alt="imagem de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { linkShare && <p className="link-copiado">Link copiado!</p> }
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="favorite-btn"
              type="button"
            >
              <img
                data-testid="favorite-btn"
                alt="icone favorito"
                src={ blackHeartIcon }
                className="heart-img"
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const fillCardsMealsAndDrinks = () => {
    if (!favoriteRecipes.length > 0) return <span>Empty</span>;
    return favoriteRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return cardMeals(recipe, index);
      }
      return cardDrinks(recipe, index);
    });
  };

  return (
    <div>
      <Header brand="Favourites Recipes" />
      <section className="favorite__filter-btn-section">
        <div className="div-explore" style={ { height: 'unset' } }>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ setFilterData }
            value="all"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ setFilterData }
            value="comida"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ setFilterData }
            value="bebida"
          >
            Drink
          </button>
        </div>
      </section>
      <div className="food-cards">
        { fillCardsMealsAndDrinks() }
      </div>
    </div>
  );
}
