import { useTranslation } from 'react-i18next';
import './resource.css';

export function ResourceView({state}) {
  const [t] = useTranslation();

  return (
    <div className="resource">
      <div>{t(state.id)}</div>
      <div>{state.count}{"/"}{state.max}</div>
    </div>
  );
}
