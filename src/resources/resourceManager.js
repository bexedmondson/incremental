import React from 'react';
import '../index.css';
import { useTranslation } from 'react-i18next';
import { ResourceView } from './resource';
import globalResourceState from '../globalResourceState';
import { useState as useGlobalState } from '@hookstate/core';

export function ResourceManager() {
  const [t] = useTranslation();

  const resourceState = useGlobalState(globalResourceState);

  return (
    <div className="gameSection">
      <div className="sectionTitle">{t('resources')}</div>
      <div className="itemList">
        {resourceState.get().map(data => <ResourceView key={data.id} state={data}/>)}
      </div>
    </div>
  );
}
