import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import TodosPage from './components/todo/TodoPage';
import ManageTodoPage from './components/todo/ManageTodoPage';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/about' component={AboutPage} />
    <Route path='/todos' component={TodosPage} />
    <Route path='/todo/:id?' component={ManageTodoPage} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
</Layout>;
