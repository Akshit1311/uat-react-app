import React from "react";

export default function HealthCheckUrl() {
  const obj = { status: "ok", responseCode: 200, instance: "running" };
  return (
    <div>
      <code>{JSON.stringify(obj)}</code>
    </div>
  );
}
