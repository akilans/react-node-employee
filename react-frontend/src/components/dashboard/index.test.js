import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Dashboard from "./";


describe('Testing Dashboard Component', () => {

    let token_data = {
        user: "admin",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE1MzA1Nzg4NDV9.295X5njDe_To1pFEBdifAoAWtW7B9jRysO6Vvv_Oddg"
    };


    beforeAll(() => {
        global.localStorage = {
            token_data: JSON.stringify(token_data),
            getItem: function () {
                return token_data.token
             },
             setItem: function() {
                token_data: JSON.stringify(token_data)
             }
        };
    });



    it("delete employee button check", () => {

        const wrapper = shallow(<Dashboard />);


        wrapper.instance().getEmployees = jest.fn();
        wrapper.update();

        const tableID = <th scope="col">Id</th>


        expect(wrapper.contains(tableID)).toEqual(true)

        //expect(localStorage.getItem).toHaveBeenCalled();

        //const spy = jest.spyOn(wrapper.instance(), "deleteEmp");
        //wrapper.instance().forceUpdate();

        //wrapper.find("button").simulate("click", { currentTarget: { value: 1 } }, spy);
        //expect(spy).toBeCalledWith(1);

        //wrapper.find('button').simulate('submit');
        //const submitButton = wrapper.find("button").at(0);



        //submitButton.simulate("submit");
        //expect(spy).toHaveBeenCalled();
        //expect(nameInput.node.value).toEqual('admin');
        //expect(wrapper.contains(loginError)).toEqual(true);

    });


})