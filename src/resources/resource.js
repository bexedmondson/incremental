import { useTranslation } from 'react-i18next';
import './resource.css';

export function ResourceView({id, count, max}) {
  const [t] = useTranslation();

  return (
    <div className="resource">
      <div>{t(id)}</div>
      <div>{count}{"/"}{max}</div>
    </div>
  );
}
