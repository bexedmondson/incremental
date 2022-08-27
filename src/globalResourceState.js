import { createState } from '@hookstate/core';
import resourceData from './data/resources.json';

const globalResourceState = createState(resourceData);

export default globalResourceState;