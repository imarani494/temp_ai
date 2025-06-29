import express from 'express';
import { Connection, WorkflowClient } from '@temporalio/client';
import { updateProfile } from '../temporal/workflows';

const router = express.Router();

router.get('/', (req, res) => {
 
  res.json({ profile: req.user });
});

router.post('/', async (req, res) => {
  const conn = new Connection();
  const client = new WorkflowClient({ connection: conn });
  const workflow = await client.start(updateProfile, {
    args: [req.body],
    taskQueue: 'profile-tq',
    workflowId: `profile-${req.body.id}-${Date.now()}`
  });

  res.json({ workflowId: workflow.workflowId });
});

export default router;
