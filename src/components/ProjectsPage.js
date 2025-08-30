import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Projects from './Projects';

const ProjectsPageContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding-top: 80px; // Отступ для фиксированного header
`;

const ProjectsPage = () => {
    return (
        <ProjectsPageContainer>
            <Projects />
        </ProjectsPageContainer>
    );
};

export default ProjectsPage;
