import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Interface } from 'readline';
import { availableMemory } from 'process';

//props

interface EC2StackProps extends cdk.StackProps { // this creates a custom interface that extends the basic cdk stack properties, adds a required vpc property of type ec2.Vpc, allowing you to pass the vpc from the vpc stack in the previous project (vpc-cdk-project-stacks) to this ec2 stack 
  vpc: ec2.Vpc;
}

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EC2StackProps) {
    super(scope, id, props);

    // EC2 Instance in the first private subnet (MyPrivateEC2)
    const instance1 = new ec2.Instance(this, 'MyPrivateEC2', {
      vpc: props.vpc, // specifies which VPC to launch the instance in
      vpcSubnets: { // specifies the type of subnet used
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        availabilityZones: [props.vpc.availabilityZones[0]] // dynamically uses the first availability zone from the VPC
      },
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 // chooses the latest Amazon Linux 2 AMI
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO) // specifies the instance type and size
    });

    cdk.Tags.of(instance1).add('Name', 'MyPrivateEC2'); // adds a name tag to the EC2 instance

    // EC2 Instance in the second private subnet (Database Subnet)
    const instance2 = new ec2.Instance(this, 'MyPrivateEC2-2', {
      vpc: props.vpc, // specifies which VPC to launch the instance in
      vpcSubnets: { // specifies the type of subnet used
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, 
          availabilityZones: [props.vpc.availabilityZones[1]] // dynamically uses the second availability zone from the VPC
      },
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 // chooses the latest Amazon Linux 2 AMI
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO) // specifies the instance type and size
    });

    cdk.Tags.of(instance2).add('Name', 'MyPrivateEC2-2'); // adds a name tag to the EC2 instance
  }
}
