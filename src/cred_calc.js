import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';

export class cred_calc extends Component{

    constructor(props){
        super(props);
        this.state={
            type_of_payment: 1,
            sum_rub: '',
            months: '',
            interest_rate: '', //процентная ставка
            deps: []
        }
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
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

    handleInputChange4(event) {
        this.setState({type_of_payment: 1});
    }

    handleInputChange5(event) {
        this.setState({type_of_payment: 2});
    }

    differentiated(){
        const stavka = this.state.interest_rate / 1200; //месячная процентная ставка
        const n = Math.floor(this.state.sum_rub / this.state.months * 100) / 100;
        const months_count = Number(this.state.months);
        let monthly_payment = 0;
        let sum_payment = 0;

        let sum_ostatok = this.state.sum_rub;
        const array = [];

        for (let i = 1; i <= months_count; i ++)
        {
            monthly_payment = Math.floor((n + sum_ostatok * stavka) * 100) / 100;
            sum_payment += monthly_payment;
            sum_ostatok = Math.floor((sum_ostatok - n) * 100) / 100;

            if (i == months_count)
            {
                sum_ostatok = 0;
            }

            const element = {
                id: i,
                monthly_payment: monthly_payment,
                sum_ostatok: sum_ostatok
            }

            array.push(element)

            this.setState({
                deps: array
            });
        }

        const element = {
            id: 'Итог',
            monthly_payment: Math.floor(sum_payment * 100) / 100,
            sum_ostatok: sum_ostatok
        }

        array.push(element)

        this.setState({
            deps: array
        });
    }

    annuity(){
        const stavka = this.state.interest_rate / 1200; //месячная процентная ставка
        const months_count = this.state.months; //количество периодов, в течение которых выплачивается кредит
        const K = (stavka * Math.pow(1 + stavka, months_count)) / (Math.pow(1 + stavka, months_count) - 1); //коэфициент анутитета
        const A = Math.floor(K * this.state.sum_rub * 100) / 100; //ануитетный платеж

        let sum_ostatok = A * months_count;
        const array = [];

        for (let i = 1; i <= months_count; i ++)
        {
            sum_ostatok = Math.floor((sum_ostatok - A) * 100) / 100;

            if (i == months_count)
            {
                sum_ostatok = 0;
            }

            const element = {
                id: i,
                monthly_payment: A,
                sum_ostatok: sum_ostatok
            }

            array.push(element)

            this.setState({
                deps: array
            });
        }

        const element = {
            id: 'Итог',
            monthly_payment: Math.floor(A * months_count * 100) / 100,
            sum_ostatok: Math.floor(sum_ostatok * 100) / 100
        }

        array.push(element)

        this.setState({
            deps: array
        });
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
        if (this.state.type_of_payment === 1)
        {
            this.differentiated();
        }
        else
        {
            this.annuity();
        }
    }

    render(){

        const {deps}=this.state;
        return(
            <div className="container">
                <h2>Кредитный калькулятор</h2>

                <p>Вид платежа:</p>
                <p>
                    <input type="radio"
                           value={this.state.type_of_payment}
                           checked={this.state.type_of_payment === 1}
                           onChange={this.handleInputChange4} />Дифференцированный
                </p>
                <p>
                    <input type="radio"
                           value={this.state.type_of_payment}
                           checked={this.state.type_of_payment === 2}
                           onChange={this.handleInputChange5} />Аннуитетный
                </p>

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

                <h3>График платежей</h3>

                <p>
                    <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                        <thead>
                        <tr>
                            <th>Месяц</th>
                            <th>Ежемесячная выплата</th>
                            <th>Остаток выплат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deps.map(dep=>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.monthly_payment}</td>
                                <td>{dep.sum_ostatok}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </p>

            </div>
        )
    }
}