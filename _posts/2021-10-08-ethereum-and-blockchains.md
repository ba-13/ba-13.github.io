---
layout: post
title: Ethereum and BlockChains
excerpt-separator: <!---->
---

Yeah, This is the part of a project I took up in the Summers of 2021. We were being introduced to BlockChains, especially, Ethereum (ETH). Let's introduce that to you too!

<!---->

First of all, **AltCoins** are all cryptocurrencies other than Bit-coin.  Why do we need any AltCoins, if Bit-coin is working fine?

The answer is quite wide of course, but the basic idea of cryptocurrencies, and blockchains in general is the idea of decentralization.  Introduction of more such crypto-currencies, have enforced this underlying principle of blockchains. Also, Bit-coin still inherits flaws that couldn't be predicted by its anonymous creator [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto), including being and inflexible. Now moving on to the point of discussion.

## Ethereum

**[Ethereum](https://en.wikipedia.org/wiki/Ethereum)** is a decentralized, open-source blockchain with smart contract functionality. **ETH**(Ether) is the actual cryptocurrency involved in this blockchain system.  Ethereum is the most active blockchain in the world, currently. It is actively used to create and host decentralized apps, or [Dapps](https://ethereum.org/en/dapps/#what-are-dapps), which actually are Smart Contracts.  Its creator are Vitalik Buterin and [Gavin Wood](https://en.wikipedia.org/wiki/Gavin_Wood), and this was initially community funded.  The idea of Ethereum was mainly to implement the smart contract system, and The platform allows developers to build and operate decentralized applications that any user can interact with. It has become a battle-tested platform on which other tokens can build-over.

  There are some standards over which smart contracts started getting standardised:

- ERC-20 : Fungible Tokens
- ERC-721 : Non-fungible Tokens.
- ERC-1155 : Best of both standards.

Fungiblity refers to being like a denomination of a currency. All tokens of the same denomination accounts for the same value. Non-fungible therefore refers to each token being unique on its own, and this type of token is useful to assign value to art-forms and physical entities.  This standardization was necessary and a community decision, cause of rampant smart contracts surfacing each day, with no good means to compare to each other.   Another great thing about Ethereum over Bit-coin is, its going to implement _proof of stake_ in _Ethereum 2.0_, which is far more efficient consensus, but not much hardened against exploitation.

## Smart Contracts

We need to talk about this, before moving on.  Smart contracts, as the term suggests, are literally contracts, a piece of code, program, which is instructed beforehand to perform something once some pre-planned conditions are met, and the main idea is that the implementation itself requires no third-party. The contract decides itself, when to execute, and its execution is transmitted everywhere.  More formally, [Smart contracts](https://www.ibm.com/in-en/topics/smart-contracts) are event-driven code contracts with state attributes, used to automate the execution of a pre-made-agreement so that all participants can be immediately certain of the outcome, without intermediary involvement or time delay.  Such guarantees are there because of this is implemented on a blockchain. The blockchain itself is updated when this transaction takes place, and therefore no-one can deny its happening, and parties who are granted permission can see the results.    A layman's analogy of a smart contract is a vending machine. Insert a coin (feedback), the vending machine was designed (programmed) such as it would deliver (transactions) your drinks (assets) according to the feedback, without anyone's intervention.

## Ethereum Virtual Machine

This concept has transformed what cryptocurrencies are meant for. It takes the idea of a blockchain, beyond the ledger meaning, and enabling to take decisions, given some initial code and feedback. This decision, once all requirements are achieved, is fail-safe, literally. Therefore Ethereum is called a distributed [state machine](https://en.wikipedia.org/wiki/Finite-state_machine), not just a decentralized ledger, that just tracks transactions.  
A state machine/finite state machine is, abstractly and in mathematical terms, is a model that can be in exactly one of a finite number of states at any given time. Fixed and unique state at a time, i.e. its configurations but in a broader sense.  A state machine can change from one state to another in response to some inputs; the change from one state to another is called a transition. Such a model is completely defined by a list of its states, its initial state, and the inputs that trigger each transition.  Ethereum's state is a large data structure which holds not only all accounts and balances, but a machine state, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code.

Ethereum Virtual Machine(referred to as EVMs), therefore being a `State Machine`, that too decentralized, therefore has some remarkable features.

- Can execute without failing if the pre-requisites are met.
- Extremely flexible as can include arbitrary code.
- Can't be down due to any kind of local problems, because of decentralization.
- All costs and value circulation are confin

This feature of Ethereum, being a state machine, enables smart contract implementation, in a practical manner. As mentioned prior, Smart contracts intrinsically contain state attributes  Therefore being deployed on a state machine, they are quite reliable. Let's compare to a case when a smart contract is deployed on a regular network (still decentralized). The code would still be available to everyone, but because there is no concept of 'state', there is always a possibility to reverse the decision and execution of the contract, cause the network doesn't know if the execution had taken place. Note that I am talking about the network itself, not the nodes.  Therefore Ethereum is unique, needed as a blockchain, and as a platform that can manage smart contracts.

## Solidity

Another programming language! One might ask, why do we need this, as Solidity is often described as a child language of JavaScript, C and Python. Take a look at the [official documentation](https://docs.soliditylang.org/en/v0.8.5/).

> Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on the Ethereum Virtual Machine. Smart contracts are programs that are executed inside a peer-to-peer network where nobody has special authority over the execution.

Solidity was created for implementing smart contracts in the first place, that too efficiently, securely and syntactically flexible as can be.  The field of smart contracts is sensitive, handling billions worth of value, and strict measures have to be taken, and being secure is the priority.

This led to a few uncommon features about solidity (found while doing this project):

**No Back-Compatibility**  The first thing one would encounter while being introduced to Solidity is:

```c
pragma solidity ^0.8.0
```

We are declaring compiler version with which the contract in context is compatible with. Why? Its not common, at least wasn't for me. The reason is the topic. All compilers are updated, new versions are launched, but most compilers support their previously handled commands, which might have been deprecated. But that leads to inheriting previous flaws and exceptions as well.  This can't be done in case of smart contracts. Any vulnerability, is a vulnerability, can be exploited so way or the other.  Therefore while creating your contract you have to designate the compatible compilers which your code can run on, and it is recommended to go for the latest [compiler](https://github.com/ethereum/solidity/releases), unless you know what you are doing.

**No Support for Floating numbers**  Vanilla Solidity doesn't support floating point! There are some external libraries which can implement that, but none of them is official. Strange? π is literally 3 here, natively.  This is from the updated documentation:

> "Fixed point numbers are not fully supported by Solidity yet. They can be declared, but cannot be assigned to or from."

But of course you can work-around this _minor_ drawback. Actually, EVM itself doesn't support floating points. You will have to understand floats implementation to understand why, here is the [link](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html).  For the workarounds, this [dialogue](https://www.reddit.com/r/ethdev/comments/8fo6po/the_lack_of_decimalsfloatdouble_in_solidity_is/) explains how to concisely:

- _Bob_: Please EVM 3/2=?
- _EVM_: Lol, 1.
- _Bob_: Ok... what about 3000/2=?
- _EVM_: Easy; 1500.

See? Manipulating numbers a bit would manage most of the calculations that one would be needed to perform, satisfactorily. You multiply by how many decimals you want to be precise to first, e.g. 10<sub><sup>18</sup></sub> do your calculation, then divide to remove the extra decimals.  It's more precise and better for financial calculations.

**Several Numeric Types**  Precisely, [5,248](https://medium.com/coinmonks/math-in-solidity-part-1-numbers-384c8377f26d). Yes, according to the documentation, there are 32 signed integer, 32 unsigned integer, 2592 signed fixed-point, and 2592 unsigned fixed-point types. JavaScript has only two numeric types. Python 2 used to have four, but in Python 3 type “long” was dropped, so now there are only three. Java has seven and C++ has something about fourteen.  So many data types, and still can't support floating points. This has a reason. Common types used in other languages are quite flexible, but inherit weird semantics of underlying CPU instructions, like silent over- and underflow, asymmetric range, binary fractions, byte ordering issues etc. Straightforward usage makes the program vulnerable, and secure usage renders it unreadable.  Actually, EVM natively supports two data-types, 256-bit word and 8-bit byte. Therefore it supports 2 numeric types originally, signed 256-bit and unsigned 256-bit integers.  All data-types of int in solidity are just multiples of 8. Assigning so many different spaced numeric types made this more flexible, as we have to save space and computational power consumed, as much as possible.

**Usual Arithmetic avoided**  Solidity does support all usual arithmetic symbols, but there use for calculations are not recommended. This is unusual, but again, needed for being more secure.  There is a `SafeMath` Library in Solidity, whose source code you can look up right [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol). Its implementation is trivial, nearly too trivial to be thought as needed.  Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. `SafeMath` restores this intuition by reverting the transaction when an operation overflows. Using this library instead of the unchecked operations eliminates an entire class of bugs, so it’s recommended to use it always.

This list can maybe go on, but these points are what I came across during this [project](https://github.com/ba-13/GameOfBlocks2021).  Else, Solidity is a neat language, actually quite similar to Javascript, and extremely intuitive keywords.

## Path to Choose Ahead

For getting started with Solidity, which is a language, for smart contracts, you would require a network. Your contract may be deployed directly to the official Ethereum Virtual Machine, which would cost you ETH and Gas, but as a beginner, one is recommended to use [REMIX](http://remix.ethereum.org), an online IDE made for the development of Smart Contracts. You can move directly to local compilers that deploy your contract to popular public test networks: [Ropsten](https://ropsten.etherscan.io/), [Göerli](https://goerli-faucet.slock.it/), [Kovan](https://faucet.kovan.network/), and [Rinkeby](https://www.rinkeby.io/). All of these networks can be accessed via Infura’s [API](https://infura.io/).  We developed basic smart contracts through REMIX, so would explain about that.

![Remix IDE](https://newpov13.files.wordpress.com/2021/09/remixe1.png)

Pardon my squiggles. The above picture briefly explains what remix is all about, as a beginner. Write your contract, syntax is intuitive as said before, compile, then choose your virtual environment on which you want to deploy this on (in this case, JavaScript VM), choose one of the 15 addresses Remix provides by default, then Deploy, and interact with the contract by exchanging addresses, taking care of the Debug terminal at the bottom.  There is a section on left column, Gas consumed. We have to care for computational power, as it is equivalent to spending ETH.  Note the License declaration at the top of the .sol file, the extension of solidity files.  From `Solidity^0.6.8` SPDX License is introduced, which needs to be in a contract before being deployed.  You're good to get started with Solidity!
