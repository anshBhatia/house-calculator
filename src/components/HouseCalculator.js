import React, { useState } from 'react';
import ReactGA from 'react-ga4';

function HouseCalculator() {
    const [totalCost, setTotalCost] = useState('');
    const [paperCost, setPaperCost] = useState('');
    const [results, setResults] = useState(null);
    // New state for EMI calculations
    const [interestRate, setInterestRate] = useState(8.50);
    const [loanTenure, setLoanTenure] = useState(20);

    // Previous formatting functions remain the same
    const formatIndianCurrency = (number) => {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    const formatNumberWithCommas = (value) => {
        return new Intl.NumberFormat('en-IN').format(value);
    };

    // New function to calculate EMI
    const calculateEMI = (loanAmount) => {
        const monthlyInterest = interestRate / (12 * 100); // Convert annual rate to monthly
        const totalMonths = loanTenure * 12;
        
        const emi = loanAmount * monthlyInterest * 
                   Math.pow(1 + monthlyInterest, totalMonths) / 
                   (Math.pow(1 + monthlyInterest, totalMonths) - 1);
        
        return Math.round(emi);
    };

    // Previous handleInputChange function remains the same
    const handleInputChange = (value, setter) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue === '') {
            setter('');
            return;
        }
        setter(formatNumberWithCommas(numericValue));
    };

    const calculateCosts = () => {
        // Track calculation event
        ReactGA.event({
            category: "Calculator",
            action: "Calculate",
            label: "House Cost Calculation",
            value: parseFloat(totalCost.replace(/,/g, '')) // Total cost as value
        });

        const total = parseFloat(totalCost.replace(/,/g, ''));
        const paper = parseFloat(paperCost.replace(/,/g, ''));

        if (!total || !paper) {
            alert('Please enter valid numbers');
            return;
        }

        const calculations = {
            registryCost: paper * 0.07,
            delta: total - paper,
            commission: total * 0.01,
            maxLoan: paper * 0.80,
            downPayment: paper * 0.20
        };

        calculations.totalCashRequired = (
            calculations.delta +
            calculations.registryCost +
            calculations.commission +
            calculations.downPayment
        );

        calculations.finalTotalCost = total + calculations.registryCost + calculations.commission;
        
        // Calculate EMI
        calculations.monthlyEMI = calculateEMI(calculations.maxLoan);

        setResults(calculations);
    };

    // Track EMI recalculation
    const handleEMIChange = (type, value) => {
        ReactGA.event({
            category: "EMI",
            action: `Changed ${type}`,
            label: `New ${type}: ${value}`
        });
        
        if (type === 'interest') {
            setInterestRate(value);
        } else {
            setLoanTenure(value);
        }
        if (results) calculateCosts();
    };

    return (
        <div className="calculator">
            {/* Previous input fields remain the same */}
            <div className="inputs">
                <div>
                    <label>Total Cost:</label>
                    <input 
                        type="text"
                        value={totalCost}
                        onChange={(e) => handleInputChange(e.target.value, setTotalCost)}
                        placeholder="Enter total cost"
                    />
                </div>

                <div>
                    <label>On-Paper Value:</label>
                    <input 
                        type="text"
                        value={paperCost}
                        onChange={(e) => handleInputChange(e.target.value, setPaperCost)}
                        placeholder="Enter on-paper value"
                    />
                </div>

                <button onClick={calculateCosts}>Calculate</button>
            </div>

            {results && (
                <div className="results">
                    <h2>Results</h2>
                    <p>Registry Cost (7%): {formatIndianCurrency(results.registryCost)}</p>
                    <p>Delta Amount: {formatIndianCurrency(results.delta)}</p>
                    <p>Commission (1%): {formatIndianCurrency(results.commission)}</p>
                    <p>Down Payment (20%): {formatIndianCurrency(results.downPayment)}</p>
                    <p>Maximum Possible Loan: {formatIndianCurrency(results.maxLoan)}</p>
                    
                    {/* New EMI section */}
                    <div className="emi-section">
                        <h3>Loan EMI Details</h3>
                        <div className="emi-inputs">
                            <div>
                                <label>Interest Rate (% p.a.):</label>
                                <input 
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => handleEMIChange('interest', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Loan Tenure (years):</label>
                                <input 
                                    type="number"
                                    value={loanTenure}
                                    onChange={(e) => handleEMIChange('tenure', e.target.value)}
                                />
                            </div>
                        </div>
                        <p>Monthly EMI: {formatIndianCurrency(results.monthlyEMI)}</p>
                        <p>Total Payment: {formatIndianCurrency(results.monthlyEMI * loanTenure * 12)}</p>
                    </div>

                    <p>Total Cash Required: {formatIndianCurrency(results.totalCashRequired)}</p>
                    <p>Final Total Cost: {formatIndianCurrency(results.finalTotalCost)}</p>
                </div>
            )}
        </div>
    );
}

export default HouseCalculator;