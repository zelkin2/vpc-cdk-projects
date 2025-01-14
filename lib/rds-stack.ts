import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds'
import { Version } from 'aws-cdk-lib/aws-lambda';

//interface

interface RDSStackProps extends cdk.StackProps {  vpc: ec2.Vpc;  }

export class RDSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);

    // Creating the RDS instance
    const instance = new rds.DatabaseInstance(this, 'MyRDS', {
      vpc: props.vpc, 
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // Correct casing
      },
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0
      }) ,
      allocatedStorage: 500,
      storageType: rds.StorageType.GP3,
      storageThroughput: 500, 
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO)
    });

    new cdk.CfnOutput(this, 'RDSInstanceEndpoint', {
      value: instance.dbInstanceEndpointAddress,
      description: 'The endpoint address of the RDS instance', // Correct property name and format
      exportName: 'RDSInstanceEndpoint', // Correct property name and format
    });


  cdk.Tags.of(instance).add('Name', 'MyRDS');
    
  }
}