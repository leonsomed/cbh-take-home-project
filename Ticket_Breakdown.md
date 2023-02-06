# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# Ticket 1: Migrate Agents table to include custom id field

## Context

Agents now have a custom id field, this field's purpose is to allow more granular control on the agent id presented externally, such as in reports. The existing database agent id will be used as before for all existing relationship with other database tables. The new id will be used to generate output for the reports. In essence, we will correlate the existing id with the new custom id.

## Acceptance Criteria

- The Agents table must include a new field called `custom_id`.
- The `custom_id` field must be a nullable string and indexed to ensure performance is not degraded when performing custom_id lookups.
- Create a database migration script with rollback functionality to ensure backward compatibility.

## Time Estimate

2 hours

# Ticket 2: Agent report to output new custom id

## Context

Agents now have a custom id field, this field's purpose is to allow more granular control on the agent id presented externally, such as in reports. The existing database agent id will be used as before for all existing relationship with other database tables. The new id will be used to generate output for the reports. In essence, we will correlate the existing id with the new custom id.

## Acceptance Criteria

- `generateReport` function must output the new custom id in the report.
- Default to the database id if a new custom id does not eixst for the agent.

## Implementation Guidelines

- `generateReport` function must create a map between the existing database id and the new custom id.
- Use the map to correlate the existing database id with the new custom id when generating the report PDF output.

## Time Estimate

4 hours
