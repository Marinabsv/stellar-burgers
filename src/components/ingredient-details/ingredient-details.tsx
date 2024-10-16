import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора DONE*/
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useSelector(
    (state: RootState) => state.ingredients
  );
  const ingredientData = data.find((ingredient) => ingredient._id === id);

  if (loading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
