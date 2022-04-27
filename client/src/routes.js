import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {TasksPage} from "./pages/TasksPage";
import {AuthPage} from "./pages/AuthPage";
import {Detail} from "./pages/Detail";
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/taskpage" exact>
                    <TasksPage />
                </Route>
                <Route path="/deatil/:id" exact>
                    <Detail />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Route path="/reg" exact>
                <RegisterPage />
            </Route>
            <Route path="/" exact>
                <TasksPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}