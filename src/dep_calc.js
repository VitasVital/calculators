import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';

export class dep_calc extends Component{

    constructor(props){
        super(props);
        this.state={
            sum_rub: '',
            months: '',
            interest_rate: '', //процентная ставка
            deps: []
        }
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    handleInputChange1(event) {
        this.setState({sum_rub: event.target.value});
    }

    handleInputChange2(event) {
        this.setState({months: event.target.value});
    }

    handleInputChange3(event) {
        this.setState({interest_rate: event.target.value});
    }

    calculate(){
        if (isNaN(Number(this.state.sum_rub)) || isNaN(Number(this.state.months)) || isNaN(Number(this.state.interest_rate))
        || this.state.sum_rub.length === 0 || this.state.months.length === 0 || this.state.interest_rate.length === 0
        || Number(this.state.sum_rub) < 1 || Number(this.state.months) < 1 || Number(this.state.interest_rate) < 0
        || this.state.interest_rate.indexOf('.') === 0 || this.state.months.indexOf('.') > -1)
        {
            alert('Неправильно введённые данные');
            return;
        }

        let new_sum_rub = Number(this.state.sum_rub);
        let plus_sum = (new_sum_rub * (100 + Number(this.state.interest_rate)) / 100 - new_sum_rub) / 12;
        const array = [];

        for (let i = 1; i <= this.state.months; i ++)
        {
            const element = {
                id: i,
                sum_percent: plus_sum,
                sum: new_sum_rub + plus_sum
            }

            array.push(element)

            this.setState({
                deps: array
            });

            new_sum_rub = new_sum_rub + plus_sum
        }

        const element = {
            id: 'Итог',
            sum_percent:new_sum_rub - Number(this.state.sum_rub),
            sum: new_sum_rub
        }

        array.push(element)

        this.setState({
            deps: array
        });
    }

    render(){

        const {deps}=this.state;
        return(
            <div className="container">
                <h2>Депозитный калькулятор</h2>

                <p>Введите сумму в рублях: </p>
                <p><input
                    type="text"
                    value={this.state.sum_rub}
                    onChange={this.handleInputChange1}/></p>

                <p>Введите срок в месяцах: </p>
                <p><input
                    type="text"
                    value={this.state.months}
                    onChange={this.handleInputChange2}/></p>

                <p>Введите процентную ставку хх.х% годовых: </p>
                <p><input
                    type="text"
                    value={this.state.interest_rate}
                    onChange={this.handleInputChange3}/></p>

                <p><Button className="mr-2" variant="primary"
                            onClick={()=>this.calculate()}>
                        Расчитать</Button></p>

                <h3>График состояния счета помесячно</h3>

                <p>
                    <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                        <thead>
                        <tr>
                            <th>Месяц</th>
                            <th>Сумма начисленных %</th>
                            <th>Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deps.map(dep=>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.sum_percent}</td>
                                <td>{dep.sum}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </p>

            </div>
        )
    }
}