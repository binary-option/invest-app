# invest-app

The application
iInvest takes a new approach to social trading, making it more trustworthy, with an emphasis on financial analysis and social validation by the investors.

In the application, a user first needs to fill out a risk profile questionnaire, which assesses his /her risk profile in a scale from 1 to 100 (a questionnaire from Charles Schwab Inc. was adapted: https://www.schwab.com/public/file/P-778947/InvestorProfileQuestionnaire.pdf).

After calculating the customer's risk profile, the customer can search for portfolios and filter by risk, return or stock name.

If the customer finds a portfolio he likes, he can go to the detail page, where he will be able to see the performance of the single stocks composing the portfolio, the portfolio compared against the SP500 index and the portfolio allocation.

The customer can also review the comments left by other users in the comment section or engage is a discussion of his own. This direct communication puts the portfolio manager in a position where he is accountable for his decisions and the customers get to air their voice if they have any concerns or questions.

The customer is finally able to invest in the portfolios he selects and has a minimalistic dashboard to review his investments.

Technology
The app uses Quandl's API as the main source of financial data. The dataset is constrained to around 2000 different stocks, with a focus on the North American Market. To access SP500 as a benchmark, a hardwired copy of Yahoo Finance data was stored into the database.

The main challenge of this app is to deal with time series. We did not use any advanced library for manipulating the data, so every single operation is carried out with vanilla JS.

The front end was implemented with Vue. The modularization of this framework makes for very clean code, but the set-up is time consuming at the beginning, which is especially relevant for small applications.

Collaborating using Github is the way to go.

Points to improve
Use more advanced libraries for time series manipulation.
Move most of the data manipulation to the backend.
Create a script to updated the returns of the portfolios in a periodic manner (currently all operations are carried out every time a customer opens a portfolio).
Implement a dictionary to enable users to find stock with natural speech as opposed to stock handler.
Add a more realistic risk profile.
Implement a method to handle payments.

Finance can be a challenging topic, but also a hugely rewarding one if you like working with data.
