'use client';

import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function LearningAccordion({ learningPoints }: { learningPoints: string[] }) {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="space-y-3">
            {learningPoints.map((point, index) => {
                const lines = point.split('\n');
                const title = lines[0];
                const description = lines.slice(1).join('\n').trim();
                const panelId = `panel-${index}`;

                return (
                    <Accordion
                        key={index}
                        expanded={expanded === panelId}
                        onChange={handleChange(panelId)}
                        className="border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                        sx={{
                            '&:before': { display: 'none' }, // Remove default divider
                            borderRadius: '0.5rem',
                            '&.Mui-expanded': {
                                margin: 0,
                                '& .MuiAccordionSummary-root': {
                                    backgroundColor: 'rgb(255 237 213)',
                                }
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-teal-700" />}
                            aria-controls={`${panelId}-content`}
                            id={`${panelId}-header`}
                            className="bg-slate-50 hover:bg-orange-50 transition-colors"
                            sx={{
                                minHeight: '3rem',
                                '&.Mui-expanded': {
                                    minHeight: '3rem',
                                }
                            }}
                        >
                            <Typography className="font-medium text-slate-800">{title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="bg-white pt-2 pb-4">
                            <Typography className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
}

export default LearningAccordion;