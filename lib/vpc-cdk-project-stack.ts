import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcCdkProjectStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc; // this line added allows other files to access this VPC stack

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'MyVpc', { // this constant creates a variable called vpc
      maxAzs: 2, // the VPC part is the CDK construct that knows how to create a VPC
      subnetConfiguration: [ // this defines what type of subnets we want
        {
          name: 'Public', // this is a label for the subnet
          subnetType: ec2.SubnetType.PUBLIC, // this creates the actual subnet with internet access
          cidrMask: 24 // determines the size of subnets for IP addresses
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // creates subnet with no internet access
          cidrMask: 24
        },
        {
          name: 'Database',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        }
      ]
    });

    new cdk.CfnOutput(this, 'VpcID', { // this creates a CloudFormation output, VpcID being the name
      value: this.vpc.vpcId, // this is the actual VPC ID that will be displayed
      description: 'VPC ID'
    });
  }
}
