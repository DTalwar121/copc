"use client";
import {use, useState} from "react";
import {ResultObject} from "@/types/shared";

export default function Page({
                                 params,
                             }: {
    params: Promise<{ calculatorSlug: string }>;
}) {
    const {calculatorSlug} = use(params);
    const [totalCustomers, setTotalCustomers] = useState(100000);
    const [selfServiceRate, setSelfServiceRate] = useState(80);
    const [sstResolution, setSstResolution] = useState(50);
    const [currentFCR, setCurrentFCR] = useState(65);
    const [result, setResult] = useState<ResultObject>();

    // TODO: need to implement better page thing
    const calculate = async () => {
        try {
            const res = await fetch(`/api/calculators/${calculatorSlug}/execute`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    input: {
                        totalCustomers,
                        selfServiceRate,
                        sstResolution,
                        currentFCR,
                    },
                }),
            });

            if (!res.ok) {
                console.log("CX cost calculation failed");
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className='tab-content active' style={{maxWidth: 400, margin: "40px auto"}}>
            <h1>{calculatorSlug}</h1>
            <div className="panel">
                <div className="panel-title">Volume & Customer Journey</div>

                {/* Total Customers */}
                <div className="input-group">
                    <div className="input-label">
                        <span>Total Customer Issues (Annual)</span>
                        <span className="input-value">
            {totalCustomers.toLocaleString()}
          </span>
                    </div>
                    <input
                        type="range"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={totalCustomers}
                        onChange={(e) => setTotalCustomers(Number(e.target.value))}
                    />
                </div>

                {/* Self Service Attempt */}
                <div className="input-group">
                    <div className="input-label">
          <span
              className="tooltip"
              data-tooltip="% who try self-service first"
          >
            Self-Service Attempt Rate
          </span>
                        <span className="input-value">{selfServiceRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={selfServiceRate}
                        onChange={(e) => setSelfServiceRate(Number(e.target.value))}
                    />
                </div>

                {/* Self Service Resolution */}
                <div className="input-group">
                    <div className="input-label">
          <span
              className="tooltip"
              data-tooltip="% resolved without human contact"
          >
            Self-Service Resolution Rate
          </span>
                        <span className="input-value">{sstResolution}%</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="90"
                        step="5"
                        value={sstResolution}
                        onChange={(e) => setSstResolution(Number(e.target.value))}
                    />
                </div>

                <div className="section-label" style={{marginTop: 20}}>
                    Human-Assisted Resolution
                </div>

                {/* First Contact Resolution */}
                <div className="input-group">
                    <div className="input-label">
          <span
              className="tooltip"
              data-tooltip="% of human-assisted contacts resolved on first attempt (excludes self-service)"
          >
            First Contact Resolution (Human)
          </span>
                        <span className="input-value">{currentFCR}%</span>
                    </div>
                    <input
                        type="range"
                        min="30"
                        max="90"
                        step="1"
                        value={currentFCR}
                        onChange={(e) => setCurrentFCR(Number(e.target.value))}
                    />
                </div>

                <div
                    style={{
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        marginTop: -8,
                        fontStyle: "italic",
                    }}
                >
                    FCR for contacts that reach a human agent
                </div>

                <button
                    onClick={calculate}
                    className='max-w-fit bg-accent-foreground p-2 text-accent   h-fit rounded-full '
                >
                    Calculate
                </button>
            </div>

            {result && (
                <div className="panel" style={{marginTop: 20}}>
                    <div className="panel-title">Results</div>
                    <pre style={{fontSize: '0.8rem', whiteSpace: 'pre-wrap'}}>
                        {JSON.stringify(result.result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
