---
layout: post
title: Ethereum and BlockChains
excerpt-separator: <!---->
---

<p>Yeah, This is the part of a project I took up in the Summers of 2021. We were being introduced to BlockChains, especially, Ethereum (ETH). Let's introduce that to you too!</p>

<!---->

<p>First of all, <strong>AltCoins</strong> are all cryptocurrencies other than Bit-coin.<br>Why do we need any AltCoins, if Bit-coin is working fine?</p>

<p>The answer is quite wide of course, but the basic idea of cryptocurrencies, and blockchains in general is the idea of decentralization.<br>Introduction of more such crypto-currencies, have enforced this underlying principle of blockchains. Also, Bit-coin still inherits flaws that couldn't be predicted by its anonymous creator <a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Satoshi_Nakamoto" target="_blank">Satoshi Nakamoto</a>, including being and inflexible. Now moving on to the point of discussion.</p>

<!-- wp:heading -->
<h2>Ethereum</h2>
<!-- /wp:heading -->

<p><strong>E<a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Ethereum" target="_blank">thereum</a></strong> is a decentralized, open-source blockchain with smart contract functionality. <strong>ETH </strong>(ether) is the actual cryptocurrency involved in this blockchain system.<br>Ethereum is the most active blockchain in the world, currently. It is actively used to create and host decentralized apps, or <a rel="noreferrer noopener" href="https://ethereum.org/en/dapps/#what-are-dapps" target="_blank">Dapps</a>, which actually are Smart Contracts.<br>Its creator are Vitalik Buterin and <a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Gavin_Wood" target="_blank">Gavin Wood</a>, and this was initially community funded.<br>The idea of Ethereum was mainly to implement the smart contract system, and The platform allows developers to build and operate decentralized applications that any user can interact with. It has become a battle-tested platform on which other tokens can build-over.</p>

<p><br>There are some standards over which smart contracts started getting standardised:</p>

<!-- wp:list -->
<ul><li>ERC-20 : Fungible Tokens</li><li>ERC-721 : Non-fungible Tokens.</li><li>ERC-1155 : Best of both standards.</li></ul>
<!-- /wp:list -->

<p>Fungiblity refers to being like a denomination of a currency. All tokens of the same denomination accounts for the same value. Non-fungible therefore refers to each token being unique on its own, and this type of token is useful to assign value to art-forms and physical entities.<br>This standardization was necessary and a community decision, cause of rampant smart contracts surfacing each day, with no good means to compare to each other. <br>Another great thing about Ethereum over Bit-coin is, its going to implement <em>proof of stake</em> in <em>Ethereum 2.0</em>, which is far more efficient consensus, but not much hardened against exploitation.</p>

<!-- wp:heading -->
<h2><strong>Smart Contracts</strong></h2>
<!-- /wp:heading -->

<p>We need to talk about this, before moving on.<br>Smart contracts, as the term suggests, are literally contracts, a piece of code, program, which is instructed beforehand to perform something once some pre-planned conditions are met, and the main idea is that the implementation itself requires no third-party. The contract decides itself, when to execute, and its execution is transmitted everywhere.<br>More formally, <a rel="noreferrer noopener" href="https://www.ibm.com/in-en/topics/smart-contracts" target="_blank">Smart contracts</a> are event-driven code contracts with state attributes, used to automate the execution of a pre-made-agreement so that all participants can be immediately certain of the outcome, without intermediary involvement or time delay.<br>Such guarantees are there because of this is implemented on a blockchain. The blockchain itself is updated when this transaction takes place, and therefore no-one can deny its happening, and parties who are granted permission can see the results.<br><br>A layman's analogy of a smart contract is a vending machine. Insert a coin (feedback), the vending machine was designed (programmed) such as it would deliver (transactions) your drinks (assets) according to the feedback, without anyone's intervention.</p>

<!-- wp:heading -->
<h2><strong>Ethereum Virtual Machine</strong></h2>
<!-- /wp:heading -->

<p>This concept has transformed what cryptocurrencies are meant for. It takes the idea of a blockchain, beyond the ledger meaning, and enabling to take decisions, given some initial code and feedback. This decision, once all requirements are achieved, is fail-safe, literally. Therefore Ethereum is called a distributed <a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Finite-state_machine" target="_blank">state machine</a>, not just a decentralized ledger, that just tracks transactions. <br><br>A state machine/finite state machine is, abstractly and in mathematical terms, is a model that can be in exactly one of a finite number of states at any given time. Fixed and unique state at a time, i.e. its configurations but in a broader sense.<br>A state machine can change from one state to another in response to some inputs; the change from one state to another is called a transition. Such a model is completely defined by a list of its states, its initial state, and the inputs that trigger each transition.<br>Ethereum's state is a large data structure which holds not only all accounts and balances, but a machine state, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code.</p>

<p><br>Ethereum Virtual Machine(referred to as EVMs), therefore being a State Machine, that too decentralized, therefore has some remarkable features.</p>

<!-- wp:list -->
<ul><li>Can execute without failing if the pre-requisites are met.</li><li>Extremely flexible as can include arbitrary code.</li><li>Can't be down due to any kind of local problems, because of decentralization.</li><li>All costs and value circulation are confined to this blockchain itself, value being transacted by ETH. So a self-reliant system.</li></ul>
<!-- /wp:list -->

<p>This feature of Ethereum, being a state machine, enables smart contract implementation, in a practical manner. As mentioned prior, Smart contracts intrinsically contain state attributes<br>Therefore being deployed on a state machine, they are quite reliable. Let's compare to a case when a smart contract is deployed on a regular network (still decentralized). The code would still be available to everyone, but because there is no concept of 'state', there is always a possibility to reverse the decision and execution of the contract, cause the network doesn't know if the execution had taken place. Note that I am talking about the network itself, not the nodes.<br>Therefore Ethereum is unique, needed as a blockchain, and as a platform that can manage smart contracts.</p>

<!-- wp:heading -->
<h2><strong>Solidity</strong></h2>
<!-- /wp:heading -->

<p>Another programming language! One might ask, why do we need this, as Solidity is often described as a child language of JavaScript, C and Python. Take a look at the <a rel="noreferrer noopener" href="https://docs.soliditylang.org/en/v0.8.5/" target="_blank">official documentation</a>.</p>

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on the Ethereum Virtual Machine. Smart contracts are programs that are executed inside a peer-to-peer network where nobody has special authority over the execution.</p></blockquote>
<!-- /wp:quote -->

<p><br>Solidity was created for implementing smart contracts in the first place, that too efficiently, securely and syntactically flexible as can be.<br>The field of smart contracts is sensitive, handling billions worth of value, and strict measures have to be taken, and being secure is the priority.</p>

<p>This led to a few uncommon features about solidity (found while doing this project):</p>

<p><strong>No Back-Compatibility</strong><br>The first thing one would encounter while being introduced to Solidity is:</p>

<!-- wp:verse -->
<pre class="wp-block-verse">pragma solidity ^0.8.0</pre>
<!-- /wp:verse -->

<p>We are declaring compiler version with which the contract in context is compatible with. Why? Its not common, at least wasn't for me. The reason is the topic. All compilers are updated, new versions are launched, but most compilers support their previously handled commands, which might have been deprecated. But that leads to inheriting previous flaws and exceptions as well.<br>This can't be done in case of smart contracts. Any vulnerability, is a vulnerability, can be exploited so way or the other.<br>Therefore while creating your contract you have to designate the compatible compilers which your code can run on, and it is recommended to go for the latest <a rel="noreferrer noopener" href="https://github.com/ethereum/solidity/releases" target="_blank">compiler</a>, unless you know what you are doing.</p>

<p><strong>No Support for F<span class="uppercase">loating numbers</span></strong><br>Vanilla Solidity doesn't support floating point! There are some external libraries which can implement that, but none of them is official. Strange? π is literally 3 here, natively.<br>This is from the updated documentation:</p>

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"Fixed point numbers are not fully supported by Solidity yet. They can be declared, but cannot be assigned to or from."</p></blockquote>
<!-- /wp:quote -->

<p>But of course you can work-around this *minor* drawback. Actually, EVM itself doesn't support floating points. You will have to understand floats implementation to understand why, here is the <a rel="noreferrer noopener" href="https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html" target="_blank">link</a>.<br>For the workarounds, this <a rel="noreferrer noopener" href="https://www.reddit.com/r/ethdev/comments/8fo6po/the_lack_of_decimalsfloatdouble_in_solidity_is/" target="_blank">dialogue</a> explains how to concisely:</p>

<!-- wp:list -->
<ul><li><em>Bob</em>: Please EVM 3/2=?</li><li><em>EVM</em>: Lol, 1.</li><li><em>Bob</em>: Ok…what about 3000/2=?</li><li><em>EVM</em>: Easy; 1500.</li></ul>
<!-- /wp:list -->

<p>See? Manipulating numbers a bit would manage most of the calculations that one would be needed to perform, satisfactorily. You multiply by how many decimals you want to be precise to first, e.g. 10<sub><sup>18</sup></sub> do your calculation, then divide to remove the extra decimals.<br>It's more precise and better for financial calculations.</p>

<p><strong>Several Numeric Types</strong><br>Precisely, <a href="https://medium.com/coinmonks/math-in-solidity-part-1-numbers-384c8377f26d">5,248</a>. Yes, according to the documentation, there are 32 signed integer, 32 unsigned integer, 2592 signed fixed-point, and 2592 unsigned fixed-point types. JavaScript has only two numeric types. Python 2 used to have four, but in Python 3 type “long” was dropped, so now there are only three. Java has seven and C++ has something about fourteen.<br>So many data types, and still can't support floating points. This has a reason. Common types used in other languages are quite flexible, but inherit weird semantics of underlying CPU instructions, like silent over- and underflow, asymmetric range, binary fractions, byte ordering issues etc. Straightforward usage makes the program vulnerable, and secure usage renders it unreadable.<br>Actually, EVM natively supports two data-types, 256-bit word and 8-bit byte. Therefore it supports 2 numeric types originally, signed 256-bit and unsigned 256-bit integers.<br>All data-types of int in solidity are just multiples of 8. Assigning so many different spaced numeric types made this more flexible, as we have to save space and computational power consumed, as much as possible.</p>

<p><strong>Usual Arithmetic avoided</strong><br>Solidity does support all usual arithmetic symbols, but there use for calculations are not recommended. This is unusual, but again, needed for being more secure.<br>There is a <code>Safemath</code> Library in Solidity, whose source code you can look up right <a rel="noreferrer noopener" href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol" target="_blank">here</a>. Its implementation is trivial, nearly too trivial to be thought as needed.<br>Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. <code>SafeMath</code> restores this intuition by reverting the transaction when an operation overflows. Using this library instead of the unchecked operations eliminates an entire class of bugs, so it’s recommended to use it always.</p>

<p>This list can maybe go on, but these points are what I came across during this <a rel="noreferrer noopener" href="https://github.com/ba-13/GameOfBlocks2021" target="_blank">project</a>.<br>Else, Solidity is a neat language, actually quite similar to Javascript, and extremely intuitive keywords.</p>

<!-- wp:heading -->
<h2>Path to Choose Ahead</h2>
<!-- /wp:heading -->

<p>For getting started with Solidity, which is a language, for smart contracts, you would require a network. Your contract may be deployed directly to the official Ethereum Virtual Machine, which would cost you ETH and Gas, but as a beginner, one is recommended to use <a rel="noreferrer noopener" href="http://remix.ethereum.org" target="_blank">REMIX</a>, an online IDE made for the development of Smart Contracts. You can move directly to local compilers that deploy your contract to popular public test networks: <a rel="noreferrer noopener" href="https://ropsten.etherscan.io/" target="_blank">Ropsten</a>, <a rel="noreferrer noopener" href="https://goerli-faucet.slock.it/" target="_blank">Göerli</a>, <a rel="noreferrer noopener" href="https://faucet.kovan.network/" target="_blank">Kovan</a>, and <a rel="noreferrer noopener" href="https://www.rinkeby.io/" target="_blank">Rinkeby</a>. All of these networks can be accessed via Infura’s <a rel="noreferrer noopener" href="https://infura.io/" target="_blank">API</a>.<br>We developed basic smart contracts through REMIX\label{remix}, so would explain about that.</p>

<p><img class="wp-image-46" style="width:900px;" src="https://newpov13.files.wordpress.com/2021/09/remixe1.png" alt=""></p>

<p>Pardon my squiggles. The above picture briefly explains what remix is all about, as a beginner. Write your contract, syntax is intuitive as said before, compile, then choose your virtual environment on which you want to deploy this on (in this case, JavaScript VM), choose one of the 15 addresses Remix provides by default, then Deploy, and interact with the contract by exchanging addresses, taking care of the Debug terminal at the bottom.<br>There is a section on left column, Gas consumed. We have to care for computational power, as it is equivalent to spending ETH.<br>Note the License declaration at the top of the .sol file, the extension of solidity files.<br>From Solidity^0.6.8 SPDX License is introduced, which needs to be in a contract before being deployed.<br>You're good to get started with Solidity!</p>
