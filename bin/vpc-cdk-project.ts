#!/usr/bin/env node after teh EC2 creation, this 
import * as cdk from 'aws-cdk-lib';
import { VpcCdkProjectStack } from '../lib/vpc-cdk-project-stack';
import { EC2Stack } from '../lib/ec2-stack';
import { RDSStack } from '../lib/rds-stack';

const app = new cdk.App();
const vpcStack = new VpcCdkProjectStack(app, 'VpcCdkProjectStack', {
 
});

new EC2Stack(app, 'MyEC2Stack', {
  vpc: vpcStack.vpc 
})

new RDSStack(app, 'MyRDSStack', {
  vpc:vpcStack.vpc
})

app.synth()

// this is fundamental to lauch the project both of ec2 instnaces and RDS stack