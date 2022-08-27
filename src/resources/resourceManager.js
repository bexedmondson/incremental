import React from 'react';
import '../index.css';
import { useTranslation } from 'react-i18next';
import { ResourceView } from './resource';
import resourceData from '../data/resources.json';

export function ResourceManager() {
  const [t] = useTranslation();

  return (
    <div className="gameSection">
      <div className="sectionTitle">{t('resources')}</div>
      <div className="itemList">
        {resourceData.map(data => <ResourceView key={data.id} id={data.id} count={data.count} max={data.max}/>)}
      </div>
    </div>
  );
}
