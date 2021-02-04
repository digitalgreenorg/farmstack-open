## Policy based usage control
In information security, access control restricts access to digital resources. The term authorization is the process of granting permission to resources. Several access control models exist, such as Discretionary Access Control (DAC), Mandatory Access Control (MAC), Role-based Access Control (RBAC), Attribute-based Access Control (ABAC), etc. The XACML (eXtensible Access Control Markup Language) Standard is commonly used in the field of access control. XACML is a policy language to express ABAC rules. 

In contrast to access control, where access to specific digital resources (e.g., a service or a file) is restricted, the IDS architecture additionally supports data-centric usage control. The overall goal is to enforce usage restrictions for data after access has been granted though policies that bind to data being exchanged. At configuration time, these policies support developers and administrators in setting up correct data flows. Usage control itself does not establish trust in an endpoint. It rather builds upon an existing trust relationship and facilitates the enforcement of legal or technical requirements or data privacy regulations. 

To implement the usage policies, the policies need to be machine readable and based on common standards so that they can be enforced. The IDS usage policy language therefore relies on the Open Digital Rights Language (ODRL). ODRL is a W3C recommendation and specifies a vocabulary and data model for the description of digital and machine-readable contracts. The IDS further extends ODRL towards usage control descriptions and enforcement, provides explanations regarding the compliant interpretation of constructs and defines implications for real-world implementations. This is accomplished in the form of IDS subclass constructs to the according ODRL classes. The design preserves the structure of the introduced terminology, resulting in the compliance of IDS usage policy with ODRL recommendations. 

The fundamental building blocks for IDS Policies are the Contracts. Contracts present the container of any usage control statement and come in three different realizations: Requests, Offers, and Agreements. While all share a similar syntax, their interpretation is slightly different. 
 - Contract requests are created by data consumers and indicate a desire to achieve a certain contract. 
 - Contract offers are created by data providers and indicate willingness to exchange data or services as outlined in Contract Offers. 
 - Contract agreements represent a binding and final consent to the stated constraints and requirements. A contract agreement is the IDS terminology for a valid contract, which both sides accept and therefore is binding as far as the IDS is related.

It must be noted that contract requests and contract offers are purely informative pieces of information and do not bind any contract. The figure below represents the hierarchical structure of a usage policy.

<img src="uc_1.png"  height="250">

## Contract agreement message flow
    Step 1: Data consumer (IDSCP2 - Client) requests contract and sends ContractRequestMessage
    Step 2: Data provider (IDSCP2 - Server) checks the contract offer and if ok, sends ContractResponseMessage
    Step 3: Data consumer checks the ContractOffer and sends back the ContractAgreementMessage

<img src="uc_2.png"  height="250">
In the current code, step1 is simulated by having a dummy ContractRequest.

## Classes
    Following classes are used in the respective xml files in provider and consumer. The actual classes are hosted by Fraunhofer.
## Provider
1. Class name: ContractOfferCreationProcessor
    1. Function: 
        - takes ContractRequestMessage as input and gives ContractResponseMessage as output
        - Sets container uri property to a hash value thereby allowing use of data only by a specific container
        - Serializes ContractOffer to a json object
    2. Important methods:
        - ContractOfferBuilder() from de.fraunhofer.iais.eis.* 
        - Utils [source](https://github.com/industrial-data-space/trusted-connector/blob/develop/camel-idscp2/src/main/- - kotlin/de/fhg/aisec/ids/camel/idscp2/Utils.kt)
        - Constants [source](https://github.com/industrial-data-space/trusted-connector/blob/develop/camel-idscp2/src/main/kotlin/de/fhg/aisec/ids/camel/idscp2/Constants.kt)
    3. Where: the first step of the route

2. Class name: TypeExtractionProcessor
    1. Function: Extracts the type of the message
    2. Why: Need to know what is the message type to trigger necessary action
    3. Where: After Provider sends ContractResponseMessage ContractAgreementMessage is 
3. Class name: ContractAgreementReceiverProcessor
    1. Function:
        - Takes ContractAgreement as input and saves it to UsageControlMaps object 
        - Deserialize ContractAgreement and saves its properties like container uri and artifacturi to hashmap for quick lookup in ProviderDB object
    2. Important methods:
        - ProviderDB [source](https://github.com/industrial-data-space/trusted-connector/blob/develop/camel-idscp2/src/main/kotlin/de/fhg/aisec/ids/camel/idscp2/Constants.kt)
        - UsageCotnrolMaps [source](https://github.com/industrial-data-space/trusted-connector/blob/develop/camel-idscp2/src/main/kotlin/de/fhg/aisec/ids/camel/idscp2/UsageControlMaps.kt)
    3. Where: Last step of accepting agreement
4. Class name: ResourceUpdateCreationProcessor
    1. Function:
    Message indicating the availability and current description of a specific resource
    2. Important Methods: Covered in previous classes
    3. Where: While sending the data (resource)

## Consumer
1. Class name: ContractOfferProcessor
    1. Function:
        - Handles a ContractResponseMessage and creates a ContractAgreementMessage
    2. Saves contract
        - Important methods: covered in previous classes
    3. Where: The first message to consumer
2. Class name: TypeExtractionProcessor
    1. Covered in provider (same function here)


## File structure

**docker-compose-provider.yaml:**</br>
    Instantiates the configuration of docker containers on provider connector like ports, networks etc. It also mounts the file that defines data routing at provider connector: example-provider-routes.xml </br>
    This is the file that needs to be executed to run the provider connector. To run the provider connector execute the command, docker-compose -f docker-compose-provider.yaml up</br>

**docker-compose-consumer.yaml:** </br> 
    Instantiates the configuration of docker containers on consumer connector like ports, networks etc. It also mounts the file that defines data routing at consumer connector: example-consumer-routes.xml </br>
    This is the file that needs to be executed to run the consumer connector. To run the provider connector execute the command, docker-compose -f docker-compose-consumer.yaml up</br>

**example-provider-routes.xml:** </br>
    Configures data routing at the provider connector using [CAMEL](https://camel.apache.org/).

**example-consumer-routes.xml:**</br>
    Configures data routing at the consumer connector using [CAMEL](https://camel.apache.org/).