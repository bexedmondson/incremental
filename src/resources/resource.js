import { useTranslation } from 'react-i18next';
import './resource.css';
import { getNiceNumber } from '../mathUtils';

export function ResourceView({state}) {
  const [t] = useTranslation();

  return (
    <div className="resource">
      <div>{t(state.id)}</div>
      <div>{getNiceNumber(state.count)}{"/"}{getNiceNumber(state.max)}</div>
    </div>
  );
}
